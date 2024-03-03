const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const baseUrl = 'https://fillout.com/api';
const authToken = 'sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';

app.get('/:formId/filteredResponses', async (req, res) => {
  try {
    const { formId } = req.params;
    const { filters } = req.query ?? {};

    const parsedFilters = filters ? JSON.parse(filters) : [];
    const responses = await fetchFilloutResponse(formId, parsedFilters);
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function fetchFilloutResponse(formId, filters) {
  const apiUrl = `${baseUrl}/${formId}/responses`;
  const response = await axios.get(apiUrl, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    params: {
      filters: JSON.stringify(filters)
    }
  });

  return response.data;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
