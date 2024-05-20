import Papa from 'papaparse';

class AirportService {
  constructor() {
    this.airportData = null;
  }

  async init() {
    if (!this.airportData) {
      try {
        // Fetch airport data from the CSV file
        const response = await fetch(
          'https://raw.githubusercontent.com/rencewang/world/927d80ab1666718c1e2d3790e8ff960dc20b5c84/src/database/airports.csv'
        );
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);

        // Parse CSV using papaparse
        const { data } = Papa.parse(csv, { header: true });

        // Store airport data
        this.airportData = data;
      } catch (error) {
        console.error('Error fetching airport data:', error);
        throw error;
      }
    }
  }

  async getAirportCoordinates(airportCode) {
    await this.init(); // Ensure airport data is fetched

    const airport = this.airportData.find(
      (airport) => airport.code === airportCode
    );

    if (airport) {
      const coordinatesString = airport.location.replace(/[()]/g, '');
      const [latitude, longitude] = coordinatesString.split(' ');

      return {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
    } else {
      throw new Error(`Airport with code ${airportCode} not found.`);
    }
  }
}

export default new AirportService();
