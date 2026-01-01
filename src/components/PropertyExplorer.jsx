// src/components/PropertyExplorer.jsx
import React, { useState, useMemo } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import propertiesJson from "../data/properties.json";
import logo from "../assets/images/jmaren.png";

const HEADER_OFFSET_PX = 80;

const $$ = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export default function PropertyExplorer() {
  const [properties] = useState(propertiesJson);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const selected = useMemo(() => properties.find((p) => p.id === selectedId) || null, [selectedId, properties]);
  const hovered = useMemo(() => properties.find((p) => p.id === hoveredId) || null, [hoveredId, properties]);
  const focus = hovered ?? selected ?? null;

  const containerStyle = {
    paddingTop: HEADER_OFFSET_PX, // space for fixed header
    height: `100vh`,
    display: "flex",
    background: "#f9f1e4",
    color: "#333",
    boxSizing: "border-box",
  };

  const leftStyle = {
    width: 420,
    minWidth: 320,
    maxWidth: 520,
    borderRight: "1px solid #e5ded1",
    background: "#ffffff",
    paddingTop: 12, // optional spacing
    height: `calc(100vh - ${HEADER_OFFSET_PX}px)`, // fits exactly under header
    overflowY: "auto", // keeps scrolling inside sidebar
  };
  const listStyle = { height: "100%", overflowY: "auto", padding: 16, display: "grid", gap: 16 };
  const mapStyle = { flex: 1, minWidth: 0, height: "100%" };

  const mapContainerStyle = { width: "100%", height: "100%" };

  // Safe icon creator using window.google after API loads
  const getMarkerIcon = (isActive) =>
    window.google
      ? {
          url: logo,
          scaledSize: new window.google.maps.Size(isActive ? 50 : 40, isActive ? 50 : 40),
          anchor: new window.google.maps.Point(isActive ? 25 : 20, isActive ? 25 : 20),
        }
      : null;

  return (
    <div style={containerStyle}>
      {/* LEFT: Property cards */}
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

      {/* RIGHT: Google Map */}
      <section style={mapStyle}>
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY_HERE">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={focus ? { lat: focus.lat, lng: focus.lng } : { lat: 29.76, lng: -95.37 }}
            zoom={12}
          >
            {properties.map((p) => {
              const isActive = p.id === (hoveredId ?? selectedId);
              return (
                <Marker
                  key={p.id}
                  position={{ lat: p.lat, lng: p.lng }}
                  onMouseOver={() => setHoveredId(p.id)}
                  onMouseOut={() => setHoveredId(null)}
                  onClick={() => setSelectedId(p.id)}
                  icon={getMarkerIcon(isActive)}
                />
              );
            })}

            {selected && (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => setSelectedId(null)}
              >
                <div style={{ fontSize: 12 }}>
                  <div style={{ fontWeight: 600 }}>{selected.name}</div>
                  <div style={{ opacity: 0.8 }}>{selected.neighborhood}</div>
                  <div style={{ marginTop: 4 }}>FROM {$$(selected.price)}</div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </section>
    </div>
  );
}

/* Helper components */
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
          <Spec icon="🛏" label={`${p.beds} BEDS`} />
          <Spec icon="🛁" label={`${p.baths} BATHS`} />
          <Spec icon="📏" label={`${p.sqft} SQ.FT.`} />
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
