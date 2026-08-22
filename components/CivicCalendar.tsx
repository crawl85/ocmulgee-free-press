"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const API_URL = "https://maconbibbcoga.api.civicclerk.com/v1/Events";
const PORTAL_URL = "https://maconbibbcoga.portal.civicclerk.com/";
const ALERTS_STORAGE_KEY = "ofp-civic-event-snapshot-v1";

type CivicEvent = {
  id: number;
  eventName: string;
  eventDescription?: string;
  startDateTime: string;
  eventCategoryName?: string;
  categoryName?: string;
  eventNotice?: string;
  hasAgenda?: boolean;
  publishedFiles?: Array<{ id: number; name?: string; type?: string; url?: string }>;
  eventLocation?: {
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
};

type ApiResponse = {
  value?: CivicEvent[];
  "@odata.nextLink"?: string;
};

type AlertStatus = "unsupported" | "default" | "denied" | "enabled";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function dateKey(value: string | Date) {
  if (typeof value === "string") return value.slice(0, 10);
  return `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, "0")}-${String(value.getUTCDate()).padStart(2, "0")}`;
}

function categoryFor(event: CivicEvent) {
  return event.eventCategoryName || event.categoryName || "Other civic event";
}

function eventLocation(event: CivicEvent) {
  const location = event.eventLocation;
  if (!location) return "Location not listed";
  const street = [location.address1, location.address2].filter(Boolean).join(", ");
  const city = [location.city, location.state, location.zipCode].filter(Boolean).join(" ");
  return [street, city].filter(Boolean).join(" · ") || "Location not listed";
}

function eventSignature(event: CivicEvent) {
  return JSON.stringify({
    name: event.eventName,
    date: event.startDateTime,
    category: categoryFor(event),
    location: eventLocation(event),
    notice: event.eventNotice || "",
    files: (event.publishedFiles || []).map((file) => [file.id, file.name, file.type, file.url]),
  });
}

function readStoredSnapshot(): Record<string, string> | null {
  try {
    const stored = window.localStorage.getItem(ALERTS_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Record<string, string>) : null;
  } catch {
    return null;
  }
}

function storeSnapshot(events: CivicEvent[]) {
  const snapshot = Object.fromEntries(events.map((event) => [String(event.id), eventSignature(event)]));
  window.localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(snapshot));
}

function monthStart(value: Date) {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), 1));
}

function addMonths(value: Date, amount: number) {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + amount, 1));
}

function buildCalendarDays(month: Date) {
  const first = monthStart(month);
  const gridStart = new Date(first);
  gridStart.setUTCDate(first.getUTCDate() - first.getUTCDay());
  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(gridStart);
    day.setUTCDate(gridStart.getUTCDate() + index);
    return day;
  });
}

export default function CivicCalendar() {
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(() => monthStart(today));
  const [events, setEvents] = useState<CivicEvent[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [alertStatus, setAlertStatus] = useState<AlertStatus>("default");
  const initialLoad = useRef(true);

  const notifyAboutChanges = useCallback((nextEvents: CivicEvent[]) => {
    if (!("Notification" in window) || Notification.permission !== "granted") {
      storeSnapshot(nextEvents);
      return;
    }

    const previous = readStoredSnapshot();
    if (previous) {
      const added = nextEvents.filter((event) => !previous[String(event.id)]);
      const changed = nextEvents.filter(
        (event) => previous[String(event.id)] && previous[String(event.id)] !== eventSignature(event),
      );

      if (added.length || changed.length) {
        const parts = [
          added.length ? `${added.length} added` : "",
          changed.length ? `${changed.length} changed` : "",
        ].filter(Boolean);
        new Notification("Macon-Bibb civic calendar updated", {
          body: `${parts.join(" and ")}. Open the Ocmulgee Free Press calendar for details.`,
          icon: "/favicon.svg",
        });
      }
    }
    storeSnapshot(nextEvents);
  }, []);

  const loadEvents = useCallback(async () => {
    if (initialLoad.current) setLoading(true);
    setError("");

    try {
      const earliest = addMonths(monthStart(today), -2);
      const parameters = new URLSearchParams({
        "$filter": `startDateTime ge ${dateKey(earliest)}`,
        "$orderby": "startDateTime asc, eventName asc",
      });
      let nextUrl: string | undefined = `${API_URL}?${parameters.toString()}`;
      const collected: CivicEvent[] = [];
      const sessionId = crypto.randomUUID();

      for (let page = 0; nextUrl && page < 30; page += 1) {
        const response = await fetch(nextUrl, {
          headers: { "X-Stream-Session": sessionId },
          cache: "no-store",
        });
        if (!response.ok) throw new Error(`CivicClerk returned ${response.status}`);
        const data = (await response.json()) as ApiResponse;
        collected.push(...(data.value || []));
        nextUrl = data["@odata.nextLink"];
      }

      const published = collected.filter((event) => event.eventName && event.startDateTime);
      setEvents(published);
      setLastUpdated(new Date());
      notifyAboutChanges(published);
    } catch (cause) {
      console.error(cause);
      setError("The live meeting feed is temporarily unavailable. You can still open the official CivicClerk portal below.");
    } finally {
      initialLoad.current = false;
      setLoading(false);
    }
  }, [month, notifyAboutChanges, today]);

  useEffect(() => {
    if (!("Notification" in window)) setAlertStatus("unsupported");
    else if (Notification.permission === "granted") setAlertStatus("enabled");
    else if (Notification.permission === "denied") setAlertStatus("denied");
  }, []);

  useEffect(() => {
    loadEvents();
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") loadEvents();
    }, 5 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [loadEvents]);

  const categories = useMemo(
    () => Array.from(new Set(events.map(categoryFor))).sort((a, b) => a.localeCompare(b)),
    [events],
  );

  const searchFiltered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return events.filter((event) => {
      const matchesCategory = category === "all" || categoryFor(event) === category;
      const searchable = [
        event.eventName,
        event.eventDescription,
        categoryFor(event),
        event.eventNotice,
        eventLocation(event),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!term || searchable.includes(term));
    });
  }, [category, events, query]);

  const calendarDays = useMemo(() => buildCalendarDays(month), [month]);
  const eventsByDate = useMemo(() => {
    const grouped = new Map<string, CivicEvent[]>();
    for (const event of searchFiltered) {
      const key = dateKey(event.startDateTime);
      grouped.set(key, [...(grouped.get(key) || []), event]);
    }
    return grouped;
  }, [searchFiltered]);

  const visibleEvents = useMemo(() => {
    if (selectedDate) return searchFiltered.filter((event) => dateKey(event.startDateTime) === selectedDate);
    return searchFiltered.filter((event) => {
      const eventDate = event.startDateTime.slice(0, 7);
      const visibleMonth = dateKey(month).slice(0, 7);
      return eventDate === visibleMonth;
    });
  }, [month, searchFiltered, selectedDate]);

  async function enableBrowserAlerts() {
    if (!("Notification" in window)) {
      setAlertStatus("unsupported");
      return;
    }
    const permission = await Notification.requestPermission();
    setAlertStatus(permission === "granted" ? "enabled" : permission === "denied" ? "denied" : "default");
    if (permission === "granted") {
      storeSnapshot(events);
      new Notification("Civic calendar alerts enabled", {
        body: "This browser will alert you when it detects an added or changed event while the calendar is open.",
        icon: "/favicon.svg",
      });
    }
  }

  function changeMonth(amount: number) {
    setMonth((current) => addMonths(current, amount));
    setSelectedDate(null);
  }

  return (
    <>
      <section className="shell civic-calendar-section" aria-labelledby="calendar-heading">
        <div className="civic-calendar-heading">
          <div>
            <p className="section-label">Live public meeting feed</p>
            <h2 id="calendar-heading">Find a meeting</h2>
          </div>
          <p>
            Sourced directly from Macon-Bibb County&apos;s CivicClerk portal. Times are shown as published by the county.
          </p>
        </div>

        <div className="civic-calendar-tools">
          <label>
            Search meetings and events
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search commission, zoning, pension…"
            />
          </label>
          <label>
            Meeting type
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">All meeting types</option>
              {categories.map((item) => (
                <option value={item} key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="civic-calendar-layout">
          <div className="calendar-panel">
            <div className="calendar-nav">
              <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">←</button>
              <h3>{monthFormatter.format(month)}</h3>
              <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">→</button>
            </div>
            <div className="calendar-weekdays" aria-hidden="true">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}
            </div>
            <div className="calendar-grid">
              {calendarDays.map((day) => {
                const key = dateKey(day);
                const dayEvents = eventsByDate.get(key) || [];
                const isCurrentMonth = day.getUTCMonth() === month.getUTCMonth();
                const isToday = key === dateKey(today);
                const isSelected = key === selectedDate;
                return (
                  <button
                    type="button"
                    key={key}
                    className={`${isCurrentMonth ? "" : "outside-month"} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedDate(isSelected ? null : key)}
                    aria-label={`${dateFormatter.format(day)}${dayEvents.length ? `, ${dayEvents.length} event${dayEvents.length === 1 ? "" : "s"}` : ""}`}
                  >
                    <span>{day.getUTCDate()}</span>
                    {dayEvents.length > 0 && <i aria-hidden="true">{dayEvents.length}</i>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="event-list-panel">
            <div className="event-list-heading">
              <div>
                <p>{selectedDate ? "Selected date" : "Selected month"}</p>
                <h3>{selectedDate ? dateFormatter.format(new Date(`${selectedDate}T12:00:00Z`)) : monthFormatter.format(month)}</h3>
              </div>
              {selectedDate && <button type="button" onClick={() => setSelectedDate(null)}>Show full month</button>}
            </div>

            <div aria-live="polite">
              {loading && <p className="calendar-state">Loading the latest public meetings…</p>}
              {!loading && error && (
                <div className="calendar-state calendar-error">
                  <p>{error}</p>
                  <button type="button" onClick={loadEvents}>Try again</button>
                </div>
              )}
              {!loading && !error && visibleEvents.length === 0 && (
                <p className="calendar-state">No matching events are listed for this {selectedDate ? "date" : "month"}.</p>
              )}
              {!loading && !error && visibleEvents.map((event) => {
                const cancelled = /cancel/i.test(`${event.eventName} ${event.eventNotice || ""}`);
                return (
                  <article className={`civic-event ${cancelled ? "is-cancelled" : ""}`} key={event.id}>
                    <div className="event-date-block">
                      <strong>{new Date(event.startDateTime).getUTCDate()}</strong>
                      <span>{new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(new Date(event.startDateTime))}</span>
                    </div>
                    <div className="event-details">
                      <p>{categoryFor(event)}</p>
                      <h4>{event.eventName}</h4>
                      <dl>
                        <div><dt>When</dt><dd>{dateFormatter.format(new Date(event.startDateTime))} at {timeFormatter.format(new Date(event.startDateTime))}</dd></div>
                        <div><dt>Where</dt><dd>{eventLocation(event)}</dd></div>
                      </dl>
                      {event.eventNotice && <p className="event-notice">{event.eventNotice}</p>}
                      <a href={PORTAL_URL} target="_blank" rel="noreferrer">Agenda, minutes and official details <span aria-hidden="true">↗</span></a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="calendar-source-line">
          <span>{lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : "Live data"}</span>
          <a href={PORTAL_URL} target="_blank" rel="noreferrer">Open the official Macon-Bibb CivicClerk portal ↗</a>
        </div>
      </section>

      <section className="civic-alerts" aria-labelledby="alerts-heading">
        <div className="shell civic-alerts-grid">
          <div className="civic-alerts-intro">
            <p className="section-label">Stay informed</p>
            <h2 id="alerts-heading">Get meeting alerts</h2>
            <p>Choose browser alerts for calendar changes or manage official email notifications through Macon-Bibb County&apos;s CivicClerk portal.</p>
          </div>
          <div className="alert-option">
            <span className="alert-option-number">01</span>
            <h3>Browser change alerts</h3>
            <p>Receive a browser notification when this page detects that an event was added or changed. Keep the calendar open for automatic checks.</p>
            {alertStatus === "enabled" ? (
              <strong className="alert-enabled">Alerts enabled on this browser</strong>
            ) : (
              <button className="button button-light" type="button" onClick={enableBrowserAlerts} disabled={alertStatus === "denied" || alertStatus === "unsupported"}>
                {alertStatus === "denied" ? "Blocked in browser settings" : alertStatus === "unsupported" ? "Not supported here" : "Enable browser alerts →"}
              </button>
            )}
          </div>
          <div className="alert-option">
            <span className="alert-option-number">02</span>
            <h3>Official email alerts</h3>
            <p>Sign in to CivicClerk and subscribe to the meeting types you follow. Macon-Bibb controls which official notices are sent.</p>
            <a className="button button-light" href={PORTAL_URL} target="_blank" rel="noreferrer">Manage email alerts ↗</a>
          </div>
        </div>
      </section>
    </>
  );
}
