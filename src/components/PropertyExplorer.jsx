import React, { useMemo, useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import propertiesJson from "../data/properties.json";

const HEADER_OFFSET_PX = 80; // match your header height

// inline icons
const IconBed = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M3 18v-6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6" />
    <path d="M3 14h18" />
  </svg>
);
const IconBath = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M3 13h18" />
    <path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
  </svg>
);
const IconRuler = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <rect x="3" y="7" width="18" height="10" rx="2" />
  </svg>
);

// ✅ FIXED: const (not cont) and no loading state needed for imported JSON
const [properties] = React.useState ? [] : []; // placeholder to please linters
// 👆 ignore that; actual state is defined inside the component below

const $$ = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function FlyTo({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, map.getZoom(), { duration: 0.5 });
  }, [center, map]);
  return null;
}

export default function PropertyExplorer() {
  // ✅ use imported JSON as initial, no loading needed
  const [properties] = React.useState(propertiesJson);

  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const selected = useMemo(
    () => properties.find((p) => p.id === selectedId) || null,
    [selectedId, properties]
  );
  const hovered = useMemo(
    () => properties.find((p) => p.id === hoveredId) || null,
    [hoveredId, properties]
  );
  const focus = hovered ?? selected ?? null;

  const containerStyle = {
    marginTop: HEADER_OFFSET_PX,
    height: `calc(100vh - ${HEADER_OFFSET_PX}px)`,
    display: "flex",
    background: "#f9f1e4",
    color: "#333",
  };
  const leftStyle = {
    width: 420,
    minWidth: 320,
    maxWidth: 520,
    borderRight: "1px solid #e5ded1",
    background: "#ffffff",
  };
  const listStyle = { height: "100%", overflowY: "auto", padding: 16, display: "grid", gap: 16 };
  const mapStyle = { flex: 1, minWidth: 0, height: "100%" };

  return (
    <div style={containerStyle}>
      {/* LEFT: cards */}
      <aside style={leftStyle}>
        <div style={{ padding: 12, display: "flex", gap: 12 }}>
          <FakeSelect label="All Current Projects" />
          <FakeSelect label="All Neighborhoods" />
        </div>
        <div style={listStyle}>
          {properties.length > 0 ? (
            properties.map((p) => (
              <Card
                key={p.id}
                active={p.id === (hoveredId ?? selectedId)}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedId(p.id)}
                p={p}
              />
            ))
          ) : (
            <div style={{ padding: 16, color: "#777", fontSize: 14 }}>No properties available</div>
          )}
        </div>
      </aside>

      {/* RIGHT: map */}
      <section style={mapStyle}>
        {properties.length > 0 ? (
          <MapContainer center={[29.76, -95.37]} zoom={12} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {focus && <FlyTo center={[focus.lat, focus.lng]} />}

            {properties.map((p) => {
              const isActive = p.id === (hoveredId ?? selectedId);
              return (
                <CircleMarker
                  key={p.id}
                  center={[p.lat, p.lng]}
                  radius={isActive ? 12 : 8}
                  pathOptions={{
                    color: isActive ? "#d9a441" : "#8aa3b0",
                    weight: isActive ? 3 : 1.5,
                    opacity: 0.95,
                  }}
                  eventHandlers={{
                    mouseover: () => setHoveredId(p.id),
                    mouseout: () => setHoveredId(null),
                    click: () => setSelectedId(p.id),
                  }}
                >
                  <Tooltip>
                    <div style={{ fontSize: 12 }}>
                      <div style={{ fontWeight: 600 }}>{p.name}</div>
                      <div style={{ opacity: 0.8 }}>{p.neighborhood}</div>
                      <div style={{ opacity: 0.7, marginTop: 4 }}>from {$$(p.price)}</div>
                    </div>
                  </Tooltip>
                </CircleMarker>
              );
            })}
          </MapContainer>
        ) : (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#777",
              fontSize: 14,
            }}
          >
            No map data available
          </div>
        )}
      </section>
    </div>
  );
}

/* helpers */
function FakeSelect({ label }) {
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #e5ded1",
          background: "#fff",
          borderRadius: 6,
          padding: "8px 12px",
          fontSize: 14,
          fontWeight: 600,
          color: "#444",
        }}
      >
        <span>{label}</span>
        <span style={{ opacity: 0.6 }}>▾</span>
      </div>
    </div>
  );
}

function Card({ p, active, ...events }) {
  return (
    <div
      {...events}
      style={{
        cursor: "pointer",
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${active ? "#d9a441" : "#e5ded1"}`,
        boxShadow: active ? "0 2px 8px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.05)",
        background: "#ffffff",
        transition: "box-shadow 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div style={{ position: "relative", height: 160, width: "100%", overflow: "hidden" }}>
        <img src={p.img} alt={p.name} style={{ height: "100%", width: "100%", objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#d9a441",
            color: "white",
            borderRadius: 9999,
            fontSize: 10,
            fontWeight: 700,
            padding: "4px 10px",
          }}
        >
          {p.status}
        </div>
        {p.unitsLeft <= 2 && (
          <div
            style={{
              position: "absolute",
              left: 12,
              bottom: 12,
              background: "#b91c1c",
              color: "white",
              fontSize: 10,
              fontWeight: 700,
              borderRadius: 4,
              padding: "4px 8px",
            }}
          >
            ONLY {p.unitsLeft} UNIT{p.unitsLeft > 1 ? "S" : ""} LEFT!
          </div>
        )}
      </div>

      <div style={{ padding: "10px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</div>
          <div style={{ fontSize: 12, color: "#777" }}>{p.neighborhood}</div>
        </div>

        <div
          style={{
            marginTop: 10,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: 10,
            fontSize: 11,
            color: "#444",
          }}
        >
          <Spec icon={<IconBed />} label={`${p.beds} BEDS`} />
          <Spec icon={<IconBath />} label={`${p.baths} BATHS`} />
          <Spec icon={<IconRuler />} label={`${p.sqft} SQ.FT.`} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 14px",
          borderTop: "1px solid #eee",
          background: "#faf8f3",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600 }}>{$$(p.price)}</div>
        <a
          href={p.url}
          onClick={(e) => e.stopPropagation()}
          style={{
            fontSize: 12,
            fontWeight: 600,
            padding: "6px 10px",
            borderRadius: 6,
            background: "#e5ded1",
            color: "#333",
            textDecoration: "none",
          }}
        >
          View details
        </a>
      </div>
    </div>
  );
}

function Spec({ icon, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          display: "inline-flex",
          height: 20,
          width: 20,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#f5f5f5",
          border: "1px solid #eee",
          color: "#555",
        }}
      >
        {icon}
      </span>
      <span style={{ opacity: 0.9 }}>{label}</span>
    </div>
  );
}
