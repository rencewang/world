import Papa from 'papaparse';

const FlightService = {
  getFlights: async () => {
    try {
      // Fetch flight data from the CSV file
      const response = await fetch('../database/flights.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);

      // Parse CSV using papaparse
      const { data } = Papa.parse(csv, { header: true });

      return data;
    } catch (error) {
      console.error('Error fetching flights:', error);
      throw error;
    }
  },
};

export default FlightService;
