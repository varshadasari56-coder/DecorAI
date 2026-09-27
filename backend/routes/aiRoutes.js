const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

console.log(
    "Gemini key loaded:",
    process.env.GEMINI_API_KEY ? "YES" : "NO"
);

router.post("/analyze", async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const base64Data = image.split(",")[1];

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",

            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: base64Data,
                            },
                        },
                        {
                            text: `
You are DecorAI, an AI decoration shopping assistant.

Analyze the uploaded decoration image and identify the decoration
products that a customer could purchase from DecorAI to recreate
the visible decoration.

IMPORTANT PRODUCT RULES:

1. ONLY recommend physical decoration products that DecorAI could
   realistically sell.

2. DO NOT recommend religious idols, statues, people, furniture,
   walls, buildings, existing household objects, food, gifts,
   personal belongings, or other non-decoration objects.

3. If an idol, statue, religious object, furniture, or other
   non-sellable object appears in the image, you may mention it
   under "decorationElements" for understanding the scene, but
   NEVER include it in "shoppingList".

4. Focus the shopping list on products such as:
   - balloons
   - balloon arches
   - artificial flowers
   - fairy lights
   - LED lights
   - backdrop curtains
   - ribbons
   - artificial leaves
   - decorative hangings
   - banners
   - streamers
   - table decoration
   - wall decoration
   - other reusable decoration accessories

5. Match the product colors and styles to what is actually visible
   in the uploaded image.

6. Do not recommend an item just because it is common. Recommend it
   only when it is visible or reasonably required to recreate the
   decoration.

7. The shopping list must contain ONLY items that DecorAI could sell.

8. Do not include the customer's existing centerpiece or main object
   as a purchasable product unless it is clearly a decoration
   accessory.

Analyze:

- Decoration theme
- Main colors
- Decoration elements
- Sellable decoration products required
- Materials/accessories
- Step-by-step decoration plan
- Estimated total cost of SELLABLE decoration products only

Estimated prices should be realistic approximate prices in Indian Rupees.

The estimated total cost must include ONLY the items in shoppingList.
`,
                        },
                    ],
                },
            ],

            config: {
                responseMimeType: "application/json",

                responseSchema: {
                    type: "object",

                    properties: {
                        theme: {
                            type: "string",
                            description: "Overall decoration theme or style",
                        },

                        colors: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            description: "Main colors visible in the decoration",
                        },

                        decorationElements: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            description: "Important decoration elements visible",
                        },

                        shoppingList: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    itemName: {
                                        type: "string",
                                        description: "Name of the decoration product needed",
                                    },
                                    category: {
                                        type: "string",
                                        description:
                                            "Product category such as balloons, lighting, flowers, backdrop, ribbon, hanging, greenery, banner, or other decoration accessory",
                                    },
                                    quantity: {
                                        type: "string",
                                        description: "Practical quantity needed",
                                    },
                                    color: {
                                        type: "string",
                                        description: "Color that should match the uploaded decoration",
                                    },
                                    style: {
                                        type: "string",
                                        description: "Product style, finish, or appearance",
                                    },
                                    description: {
                                        type: "string",
                                        description: "Short description of the required product",
                                    },
                                    estimatedPrice: {
                                        type: "number",
                                        description: "Approximate price in Indian Rupees",
                                    },
                                },
                                required: [
                                    "itemName",
                                    "category",
                                    "quantity",
                                    "color",
                                    "style",
                                    "description",
                                    "estimatedPrice",
                                ],
                            },
                        },

                        materials: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },

                        steps: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },

                        estimatedTotalCost: {
                            type: "number",
                        },
                    },

                    required: [
                        "theme",
                        "colors",
                        "decorationElements",
                        "shoppingList",
                        "materials",
                        "steps",
                        "estimatedTotalCost",
                    ],
                },
            },
        });

        const analysis = JSON.parse(response.text);

        res.json({
            success: true,
            analysis,
        });
    } catch (error) {
        console.error("Gemini AI analysis error:", error);

        res.status(500).json({
            success: false,
            message: "AI analysis failed",
        });
    }
});

module.exports = router;