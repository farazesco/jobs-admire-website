export default async function handler(req, res) {
    try {
        // Only allow GET requests
        if (req.method !== "GET") {
            return res.status(405).json({ error: "Method Not Allowed" });
        }

        // Get university ID from query parameters
        const university = req.query.university;
        console.log(req.query);
        if (!university) {
            return res.status(400).json({ error: "University ID is required" });
        }

        // Fetch data from external API
        const response = await fetch(
            `https://dev-university-service.uniadmire.com/api/programs?page=0&size=10000&university=${university}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch external API");
        }

        const data = await response.json();

        // Optional: Add CORS headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        res.status(200).json(data);
    } catch (error) {
        console.error("API Route Error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
