"use client";

import { useMemo, useState } from "react";
import type { RecordItem } from "@/lib/content";

export default function RecordsExplorer({ records }: { records: RecordItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All records");
  const categories = ["All records", ...Array.from(new Set(records.map((record) => record.category)))];
  const filtered = useMemo(() => records.filter((record) => {
    const haystack = `${record.title} ${record.agency} ${record.description}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (category === "All records" || record.category === category);
  }), [query, category, records]);

  return (
    <div className="records-explorer">
      <div className="records-tools">
        <label className="search-field">
          <span>Search the library</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Agency, topic, title…" />
        </label>
        <label className="select-field">
          <span>Filter by category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <div className="records-count"><strong>{filtered.length}</strong> public records available</div>
      <div className="record-list">
        {filtered.map((record) => (
          <article className="record-row" key={`${record.title}-${record.date}`}>
            <div className="file-badge">{record.format}</div>
            <div className="record-main">
              <p className="record-category">{record.category}</p>
              <h2>{record.title}</h2>
              <p>{record.description}</p>
              <div className="record-meta"><span>{record.agency}</span><span>{record.date}</span><span>{record.size}</span></div>
            </div>
            <div className="record-actions">
              <a href={record.file} target="_blank" rel="noreferrer">View</a>
              <a href={record.file} download>Download ↓</a>
            </div>
          </article>
        ))}
        {filtered.length === 0 && <div className="empty-state"><strong>No records found.</strong><span>Try another keyword or category.</span></div>}
      </div>
    </div>
  );
}
