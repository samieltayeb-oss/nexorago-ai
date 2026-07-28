import React from "react";
import { Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";

// Mock Base64 Images for PDF elements
const mockQRCode = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; 
// Using simple black square as mock QR for now.

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#080808",
    color: "#ADA89F",
    padding: 40,
    fontFamily: "Helvetica",
  },
  titlePage: {
    backgroundColor: "#080808",
    color: "#ADA89F",
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "#C49A10",
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#F2EDE4",
    marginBottom: 40,
    textAlign: "center",
  },
  brandBox: {
    border: "1px solid #C49A10",
    padding: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#C49A10",
    borderBottom: "1px solid #C49A10",
    paddingBottom: 5,
    marginBottom: 15,
    marginTop: 20,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  col: {
    width: "48%",
  },
  box: {
    backgroundColor: "#111111",
    padding: 15,
    borderRadius: 5,
    border: "1px solid #333333",
    marginBottom: 15,
  },
  boxTitle: {
    fontSize: 12,
    color: "#F2EDE4",
    marginBottom: 5,
    fontWeight: "bold",
  },
  qrBox: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    padding: 5,
  },
  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #333333",
    paddingVertical: 5,
  },
  activityBox: {
    backgroundColor: "#111111",
    padding: 10,
    marginBottom: 5,
    borderLeft: "2px solid #C49A10",
  },
  emergencyBox: {
    backgroundColor: "#4a0000",
    padding: 15,
    border: "1px solid #ff4444",
    marginTop: 30,
  },
});

export const TripPdfDocument = ({ itinerary }: { itinerary: any }) => (
  <Document>
    {/* Page 1: Cover & Emergency Contacts */}
    <Page size="A4" style={styles.titlePage}>
      <View style={styles.brandBox}>
        <Text style={styles.title}>NEXORAGO AI</Text>
        <Text style={styles.subtitle}>VIP Canadian Rockies Itinerary</Text>
      </View>
      
      <Text style={{ ...styles.text, marginTop: 40, textAlign: "center", fontSize: 12, color: "#F2EDE4" }}>
        {itinerary.summary}
      </Text>
      <Text style={{ ...styles.text, textAlign: "center" }}>
        Optimal Base: {itinerary.bestBase}
      </Text>

      {/* Emergency Contacts */}
      <View style={styles.emergencyBox}>
        <Text style={{ ...styles.boxTitle, color: "#ff8888" }}>OFFLINE EMERGENCY CONTACTS</Text>
        <Text style={{ ...styles.text, color: "#ffcccc" }}>Parks Canada Dispatch (Banff): 403-762-1470</Text>
        <Text style={{ ...styles.text, color: "#ffcccc" }}>RCMP / Ambulance: 911</Text>
        <Text style={{ ...styles.text, color: "#ffcccc" }}>Road Conditions: 511 Alberta</Text>
        <Text style={{ ...styles.text, color: "#ffcccc", marginTop: 5 }}>
          WARNING: Cell service drops completely on the Icefields Parkway (Hwy 93N). Keep this PDF available offline.
        </Text>
      </View>
    </Page>

    {/* Page 2: Strategy, Budget & Hotel Reservations */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Trip Logistics & Budget</Text>
      
      <View style={styles.row}>
        {/* Seasonal Strategy */}
        <View style={styles.col}>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Intelligence Strategy</Text>
            {itinerary.seasonalIntelligence ? (
              <Text style={styles.text}>{itinerary.seasonalIntelligence.aiStrategy}</Text>
            ) : (
              <Text style={styles.text}>Standard seasonal rules apply.</Text>
            )}
          </View>
        </View>

        {/* Budget */}
        <View style={styles.col}>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Estimated Budget (CAD)</Text>
            <View style={styles.budgetRow}>
              <Text style={styles.text}>Accommodation</Text>
              <Text style={{ ...styles.text, color: "#C49A10" }}>${itinerary.estimatedBudget?.accommodation || 0}</Text>
            </View>
            <View style={styles.budgetRow}>
              <Text style={styles.text}>Activities</Text>
              <Text style={{ ...styles.text, color: "#C49A10" }}>${itinerary.estimatedBudget?.activities || 0}</Text>
            </View>
            <View style={styles.budgetRow}>
              <Text style={styles.text}>Food</Text>
              <Text style={{ ...styles.text, color: "#C49A10" }}>${itinerary.estimatedBudget?.food || 0}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Hotel Reservation Mock Block */}
      <Text style={styles.sectionTitle}>Hotel Check-In</Text>
      <View style={{ ...styles.box, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View>
          <Text style={styles.boxTitle}>Primary Base: {itinerary.bestBase}</Text>
          <Text style={styles.text}>Confirmation: #NX-8842-110</Text>
          <Text style={styles.text}>Status: Confirmed</Text>
          <Text style={styles.text}>Directions: Keep right on Trans-Canada Hwy 1.</Text>
        </View>
        {/* Mock QR Code for Check-in */}
        <View style={{ alignItems: "center" }}>
           <Image src={mockQRCode} style={styles.qrBox} />
           <Text style={{ fontSize: 8, marginTop: 4 }}>Scan to Check-in</Text>
        </View>
      </View>
    </Page>

    {/* Pages 3+: Daily Itinerary */}
    {itinerary.dailyItinerary?.map((day: any, i: number) => (
      <Page key={i} size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Day {day.dayNumber}: {day.theme}</Text>
        <Text style={{ ...styles.text, color: "#C49A10", marginBottom: 15 }}>{day.date}</Text>

        {/* Weather Intelligence */}
        {day.weatherIntelligence && (
          <View style={{ ...styles.box, borderLeft: "2px solid #55aaff" }}>
            <Text style={{ ...styles.boxTitle, color: "#55aaff" }}>Weather Intelligence: {day.weatherIntelligence.forecastSummary}</Text>
            <Text style={styles.text}>{day.weatherIntelligence.aiRecommendation}</Text>
          </View>
        )}

        {/* Morning */}
        <Text style={{ ...styles.boxTitle, marginTop: 10 }}>Morning</Text>
        {Array.isArray(day.morning) ? day.morning.map((act: any, j: number) => (
          <View key={`m-${j}`} style={styles.activityBox}>
            <View style={styles.row}>
              <Text style={{ ...styles.text, color: "#F2EDE4", fontWeight: "bold" }}>{act.title}</Text>
              <Text style={{ ...styles.text, color: "#C49A10" }}>{act.time} ({act.durationMinutes}m)</Text>
            </View>
            <Text style={styles.text}>{act.description}</Text>
            {act.reservationRequired && (
              <Text style={{ ...styles.text, color: "#ffcc00", marginTop: 5 }}>* Reservation Required</Text>
            )}
          </View>
        )) : <Text style={styles.text}>{day.morning}</Text>}

        {/* Afternoon */}
        <Text style={{ ...styles.boxTitle, marginTop: 10 }}>Afternoon</Text>
        {Array.isArray(day.afternoon) ? day.afternoon.map((act: any, j: number) => (
          <View key={`a-${j}`} style={styles.activityBox}>
            <View style={styles.row}>
              <Text style={{ ...styles.text, color: "#F2EDE4", fontWeight: "bold" }}>{act.title}</Text>
              <Text style={{ ...styles.text, color: "#C49A10" }}>{act.time} ({act.durationMinutes}m)</Text>
            </View>
            <Text style={styles.text}>{act.description}</Text>
            {act.reservationRequired && (
               <Text style={{ ...styles.text, color: "#ffcc00", marginTop: 5 }}>* Reservation Required</Text>
            )}
          </View>
        )) : <Text style={styles.text}>{day.afternoon}</Text>}

        {/* Evening */}
        <Text style={{ ...styles.boxTitle, marginTop: 10 }}>Evening</Text>
        {Array.isArray(day.evening) ? day.evening.map((act: any, j: number) => (
          <View key={`e-${j}`} style={styles.activityBox}>
            <View style={styles.row}>
              <Text style={{ ...styles.text, color: "#F2EDE4", fontWeight: "bold" }}>{act.title}</Text>
              <Text style={{ ...styles.text, color: "#C49A10" }}>{act.time} ({act.durationMinutes}m)</Text>
            </View>
            <Text style={styles.text}>{act.description}</Text>
          </View>
        )) : <Text style={styles.text}>{day.evening}</Text>}

      </Page>
    ))}
  </Document>
);
