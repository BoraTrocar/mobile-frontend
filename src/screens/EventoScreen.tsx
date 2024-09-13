import { format } from "date-fns";
import React, { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Card, Text } from "react-native-paper";
import { Header } from "../components/header";
import { HorizontalMenu } from "../components/menu";
import styles from "../styles/EventoScreenStyles";
import globalStyles from "../styles/globalStyles";

interface DayObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
}

interface Event {
  name: string;
}

interface EventsMap {
  [key: string]: Event[];
}

const events: EventsMap = {
  "2024-08-28": [{ name: "Evento 1" }, { name: "Evento 2" }],
  "2024-08-29": [{ name: "Evento 3" }],
};

export function EventoScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const renderEvents = (day: string) => {
    const dayEvents = events[day] || [];
    return (
      <View>
        {dayEvents.length > 0 ? (
          dayEvents.map((event, index) => (
            <Card key={index} style={styles.eventCard}>
              <Card.Content>
                <Text>{event.name}</Text>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={styles.noEvents}>Nenhum evento</Text>
        )}
      </View>
    );
  };

  interface MarkedDate {
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
    marked?: boolean;
    dotColor?: string;
  }

  const markedDates = Object.keys(events).reduce((acc, date) => {
    acc[date] = {
      marked: true,
      dotColor: "blue",
    };
    return acc;
  }, {} as { [key: string]: MarkedDate });

  if (selectedDate) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: "blue",
      selectedTextColor: "white",
      marked: true,
      dotColor: "blue",
    };
  }

  return (
    <View style={styles.container}>
      <Header />
      <Calendar
        onDayPress={(day: DayObject) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={markedDates}
        theme={{
          todayTextColor: "red",
          arrowColor: "blue",
          monthTextColor: "blue",
          textDayFontWeight: "300",
        }}
      />

      <View style={styles.eventsContainer}>
        {selectedDate && (
          <View>
            <Text style={styles.selectedDate}>
              {format(new Date(selectedDate), "dd MMM yyyy")}
            </Text>
            {renderEvents(selectedDate)}
          </View>
        )}
      </View>

      <View style={globalStyles.fixedMenu}>
        <HorizontalMenu />
      </View>
    </View>
  );
}
