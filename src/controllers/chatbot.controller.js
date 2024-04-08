import natural from "natural";
const data = [
  { question: "What are the major fruit crops grown in Uttar Pradesh?", answer: "Mango, guava, and banana are the major fruit crops grown in Uttar Pradesh." },
  { question: "Hi!", answer: "Hello! How can I assist you today?" },
  { question: "Hello!", answer: "Hi there! What can I do for you?" },
  { question: "Hey!", answer: "Hey! How can I help you?" },
  { question: "Hi there!", answer: "Hello! How can I assist you today?" },
  { question: "Hello there!", answer: "Hi! What can I do for you?" },
  { question: "Hey there!", answer: "Hello! How can I help you?" },
  { question: "Good morning!", answer: "Good morning! How can I assist you today?" },
  { question: "Good afternoon!", answer: "Good afternoon! How can I assist you today?" },
  { question: "Good evening!", answer: "Good evening! How can I assist you today?" },
  { question: "Hey!", answer: "Hey! How can I help you today?" },
  { question: "What is the most common symptom of fungal plant diseases?", answer: "The most common symptom of fungal plant diseases is the presence of powdery mildew on leaves." },
  { question: "How do you identify bacterial plant diseases?", answer: "Bacterial plant diseases often cause wilting, leaf spots, or soft rot on affected plants." },
  { question: "What is a preventive measure to control plant diseases?", answer: "Implementing crop rotation helps prevent the buildup of pathogens in the soil, reducing the risk of plant diseases." },
  { question: "What are some symptoms of viral plant diseases?", answer: "Symptoms of viral plant diseases include mottled or distorted leaves, stunted growth, and yellowing of foliage." },
  { question: "How can you treat fungal plant diseases organically?", answer: "Organic treatments for fungal plant diseases include applying neem oil, copper fungicides, or baking soda solutions to affected plants." },
  { question: "What is damping off in plants, and how can it be prevented?", answer: "Damping off is a fungal disease that causes seedlings to collapse and die. Preventive measures include using sterile soil, providing adequate air circulation, and avoiding overwatering." },
  { question: "What are some common signs of rust fungal infections in plants?", answer: "Common signs of rust fungal infections include orange, yellow, or brown powdery spots on leaves, stems, or fruit." },
  { question: "How do you control powdery mildew on plants?", answer: "Controlling powdery mildew involves pruning affected plant parts, improving air circulation, and applying fungicidal sprays like sulfur or potassium bicarbonate." },
  { question: "What is the role of plant quarantine in disease management?", answer: "Plant quarantine helps prevent the introduction and spread of plant diseases by regulating the movement of plants and plant products across borders." },
  { question: "What are some natural predators or biological controls for plant pests?", answer: "Ladybugs, lacewings, and parasitic wasps are natural predators that help control plant pests like aphids and caterpillars." },
  { question: "How do you identify root rot in plants?", answer: "Root rot in plants is characterized by brown, mushy roots, wilting foliage, and stunted growth. It is often caused by overwatering or poorly drained soil." },
  { question: "What are some cultural practices to prevent plant diseases?", answer: "Cultural practices such as planting disease-resistant varieties, maintaining proper spacing between plants, and removing diseased plant debris help prevent the spread of plant diseases." },
  { question: "How do you differentiate between viral and bacterial plant diseases?", answer: "Viral plant diseases are often systemic and spread through vectors like insects, while bacterial diseases typically cause localized symptoms and can be spread through contaminated soil or water." },
  { question: "What is the role of pruning in managing plant diseases?", answer: "Pruning helps remove diseased or dead plant parts, improving air circulation and reducing the spread of fungal and bacterial diseases." },
  { question: "How can you prevent the spread of plant diseases in a greenhouse?", answer: "Practicing good sanitation, maintaining proper humidity and temperature levels, and regularly inspecting plants for signs of disease help prevent the spread of plant diseases in a greenhouse." },
  { question: "What are some symptoms of nutrient deficiency in plants that mimic disease symptoms?", answer: "Yellowing or discoloration of leaves, stunted growth, and leaf drop can be symptoms of both nutrient deficiency and plant diseases, making diagnosis challenging." },
  { question: "How do you identify and manage powdery mildew on roses?", answer: "Identifying powdery mildew on roses involves inspecting leaves for white, powdery spots. Management techniques include pruning infected foliage, applying fungicidal sprays, and improving air circulation." },
  { question: "What are some organic methods to control aphids on plants?", answer: "Organic methods to control aphids include spraying plants with a mixture of water and insecticidal soap, releasing ladybugs or other beneficial insects, and planting companion plants that repel aphids." },
  { question: "How do you diagnose and treat phytophthora root rot in plants?", answer: "Diagnosing phytophthora root rot involves observing symptoms like yellowing leaves and stunted growth. Treatment options include improving soil drainage, applying fungicidal drenches, and planting resistant varieties." },
  { question: "What are some signs of late blight disease in tomato plants?", answer: "Signs of late blight disease in tomato plants include dark, water-soaked lesions on leaves, stems, and fruit, often accompanied by a white, fuzzy fungal growth on the undersides of leaves." },
  { question: "Which crop is commonly grown as a cash crop in Uttar Pradesh?", answer: "Tobacco is commonly grown as a cash crop in Uttar Pradesh." },
  { question: "What is the main winter crop cultivated in Uttar Pradesh?", answer: "Wheat is the main winter crop cultivated in Uttar Pradesh." },
  { question: "Which crop is known as the 'Queen of Fruits' and is grown in Uttar Pradesh?", answer: "Litchi, known as the 'Queen of Fruits', is grown in Uttar Pradesh." },
  { question: "Which crop is commonly grown in the eastern region of Uttar Pradesh?", answer: "Rice is commonly grown in the eastern region of Uttar Pradesh." },
  { question: "What is the main cereal crop grown in Uttar Pradesh?", answer: "Wheat is the major cereal crop grown in Uttar Pradesh." },
  { question: "Which crop is known as the 'King of Vegetables' and is grown in Uttar Pradesh?", answer: "Brinjal, known as the 'King of Vegetables', is grown in Uttar Pradesh." },
  { question: "Which crop is commonly grown as a fodder crop in Uttar Pradesh?", answer: "Sorghum is commonly grown as a fodder crop in Uttar Pradesh." },
  { question: "What are the major commercial crops grown in Uttar Pradesh?", answer: "Jute, sugarcane, and cotton are the major commercial crops grown in Uttar Pradesh." },
  { question: "Which crop is known as the 'Golden Fiber' and is extensively cultivated in Uttar Pradesh?", answer: "Jute, also known as the 'Golden Fiber', is extensively cultivated in Uttar Pradesh." },
  { question: "Which crop is commonly grown as a cover crop to control weeds in Uttar Pradesh?", answer: "Cowpea is commonly grown as a cover crop to control weeds in Uttar Pradesh." },
  { question: "Which crop is known as the 'King of Grasses' and is cultivated in Uttar Pradesh?", answer: "Barley, known as the 'King of Grasses', is cultivated in Uttar Pradesh." },
  { question: "Which crop is commonly grown in the western region of Uttar Pradesh?", answer: "Wheat is commonly grown in the western region of Uttar Pradesh." },
  { question: "Which crop is commonly intercropped with sugarcane in Uttar Pradesh?", answer: "Soybean is commonly intercropped with sugarcane in Uttar Pradesh." },
  { question: "Which crop is known as the 'King of Fruits' and is grown in Uttar Pradesh?", answer: "Mango, known as the 'King of Fruits', is grown in Uttar Pradesh." },
  { question: "Which crop is commonly grown in the northern region of Uttar Pradesh?", answer: "Sugarcane is commonly grown in the northern region of Uttar Pradesh." },
  { question: "Which crop is known as the 'King of Pulses' and is grown in Uttar Pradesh?", answer: "Black gram, also known as the 'King of Pulses', is grown in Uttar Pradesh." },
  { question: "Which crop is commonly grown in the southern region of Uttar Pradesh?", answer: "Sugarcane is commonly grown in the southern region of Uttar Pradesh." },
  { question: "Which crop is known as the 'King of Green Vegetables' and is grown in Uttar Pradesh?", answer: "Spinach, known as the 'King of Green Vegetables', is grown in Uttar Pradesh." },
  { question: "Which crop is commonly grown in the alluvial regions of Uttar Pradesh?", answer: "Rice is commonly grown in the alluvial regions of Uttar Pradesh." },
  { question: "What are the main crops grown in Uttar Pradesh?", answer: "The main crops grown in Uttar Pradesh include wheat, rice, sugarcane, and pulses." },
  { question: "Which crops are suitable for the Gangetic plains of Uttar Pradesh?", answer: "Wheat, rice, sugarcane, and maize are suitable crops for the Gangetic plains of Uttar Pradesh." },
  { question: "What is the best crop for sandy soil in Uttar Pradesh?", answer: "Mustard is a suitable crop for sandy soil in Uttar Pradesh." },
  { question: "Which crop is commonly grown in the Bundelkhand region of Uttar Pradesh?", answer: "Pulses such as chickpeas and lentils are commonly grown in the Bundelkhand region of Uttar Pradesh." },
  { question: "What crops are suitable for the Terai region of Uttar Pradesh?", answer: "Rice and sugarcane are suitable crops for the Terai region of Uttar Pradesh." },
  { question: "Which crop is known as the 'Golden Fiber of India' and is grown in Uttar Pradesh?", answer: "Jute, known as the 'Golden Fiber of India', is grown in Uttar Pradesh." },
  { question: "Which crop is commonly grown as a cash crop in Uttar Pradesh?", answer: "Tobacco is commonly grown as a cash crop in Uttar Pradesh." },
  { question: "What is the main winter crop cultivated in Uttar Pradesh?", answer: "Wheat is the main winter crop cultivated in Uttar Pradesh." },
  { question: "Which crop is known as the 'Queen of Fruits' and is grown in Uttar Pradesh?", answer: "Litchi, known as the 'Queen of Fruits', is grown in Uttar Pradesh." },
  { question: "Which crop is commonly grown in the eastern region of Uttar Pradesh?", answer: "Rice is commonly grown in the eastern region of Uttar Pradesh." },
  { question: "What is the main cereal crop grown in Uttar Pradesh?", answer: "Wheat is the major cereal crop grown in Uttar Pradesh." },
  { question: "Which crop is known as the 'King of Vegetables' and is grown in Uttar Pradesh?", answer: "Brinjal, known as the 'King of Vegetables', is grown in Uttar Pradesh." },
  { question: "Which crop is commonly grown as a fodder crop in Uttar Pradesh?", answer: "Sorghum is commonly grown as a fodder crop in Uttar Pradesh." },
  { question: "What are the major commercial crops grown in Uttar Pradesh?", answer: "Jute, sugarcane, and cotton are the major commercial crops grown in Uttar Pradesh." },
  { question: "Which crop is known as the 'Golden Fiber' and is extensively cultivated in Uttar Pradesh?", answer: "Jute, also known as the 'Golden Fiber', is extensively cultivated in Uttar Pradesh." },
   // Marketplace
   { question: "How can I register as a seller on the marketplace?", answer: "To register as a seller on the marketplace, you need to create an account and provide necessary information such as your contact details, farm location, and the crops you intend to sell. Once your account is verified, you can start listing your crops for sale." },
   { question: "What types of crops can I sell on the marketplace?", answer: "You can sell a wide range of crops on the marketplace, including fruits, vegetables, grains, pulses, and spices. Additionally, you can also offer other agricultural products such as seeds and fertilizers." },
   { question: "How do I upload my crop listings on the marketplace?", answer: "To upload your crop listings, log in to your seller account and navigate to the 'Sell Crops' section. Fill in the required details for each crop, such as crop type, quantity, quality, and price. You can also upload images to showcase your crops to potential buyers." },
   { question: "Is there a fee for selling crops on the marketplace?", answer: "There is no fee for listing your crops on the marketplace. However, a small commission fee may be deducted from your earnings upon successful sale of your crops. The commission percentage varies depending on the crop type and selling price." },
   { question: "How do I receive payments for the crops I sell?", answer: "Once your crops are sold, the payment will be transferred to your account balance on the platform. You can then withdraw your earnings to your bank account by providing your bank details and initiating a withdrawal request." },
   // Kisaan Profile
   { question: "How can I view my account balance on the platform?", answer: "You can view your account balance by accessing your profile and navigating to the 'Balance' section. Here, you will find details of your current balance, including earnings from crop sales and any other transactions." },
   { question: "Can I request a withdrawal of my earnings from the platform?", answer: "Yes, you can request a withdrawal of your earnings from the platform by providing your bank account details, including the account holder name, account number, IFSC code, and bank branch details. Once your withdrawal request is processed, the funds will be transferred to your bank account." },
   { question: "Is my bank information secure on the platform?", answer: "Yes, we prioritize the security of your bank information on our platform. We use encryption and other security measures to protect your sensitive data from unauthorized access or misuse." },
   { question: "How do I update my bank account details on the platform?", answer: "You can update your bank account details by accessing your profile settings and navigating to the 'Bank Details' section. Here, you can edit or add new bank account information as needed." },
   { question: "What should I do if I encounter issues with my account balance or withdrawals?", answer: "If you encounter any issues related to your account balance or withdrawals, please contact our customer support team for assistance. Our team will investigate the issue and provide prompt resolution." },
 
   // Blogs
   { question: "Where can I find blogs related to farming on the platform?", answer: "You can find blogs related to farming by visiting the 'Blogs' section on our platform. Here, you will find a wide range of informative articles, tips, and guides covering various aspects of agriculture and farming practices." },
   { question: "What topics are covered in the farming blogs?", answer: "Our farming blogs cover a diverse range of topics, including crop cultivation techniques, pest and disease management, soil health, irrigation methods, organic farming practices, market trends, and government schemes for farmers. We strive to provide valuable insights and guidance to help farmers improve their agricultural practices and productivity." },
   { question: "Are the farming blogs written by experts in the field?", answer: "Yes, our farming blogs are authored by agricultural experts, agronomists, researchers, and experienced farmers with in-depth knowledge and expertise in their respective fields. We ensure that our content is accurate, informative, and up-to-date to provide valuable resources to our farming community." },
   { question: "Can I contribute my own farming articles to the platform?", answer: "Yes, we welcome contributions from farmers, agricultural experts, and enthusiasts who wish to share their knowledge and experiences with our farming community. If you have valuable insights or tips to offer, you can submit your articles for review, and upon approval, they will be published on our platform for others to benefit from." },
   { question: "How often are new farming blogs published on the platform?", answer: "We strive to publish new farming blogs regularly to keep our content fresh, relevant, and engaging for our audience. Our team of writers and contributors works diligently to research and create high-quality articles on a variety of farming topics, ensuring that our users have access to the latest information and insights." },
 
   // Inventory Management
   { question: "What is the inventory management feature on the platform?", answer: "The inventory management feature allows farmers to keep track of their agricultural inputs, equipment, and produce effectively. It enables users to monitor inventory levels, track usage, forecast demand, and streamline replenishment processes, helping them optimize their farm operations and minimize wastage." },
   { question: "How can I use the inventory management feature for my farm?", answer: "To use the inventory management feature, farmers can log in to their accounts and access the 'Inventory' section on the platform. Here, they can add new inventory items, record quantities, categorize items, set reorder points, and generate reports to gain insights into their inventory status and performance." },
   { question: "What are the benefits of using the inventory management feature?", answer: "The inventory management feature offers several benefits to farmers, including improved efficiency, better resource allocation, reduced costs, minimized wastage, enhanced decision-making, and increased productivity. By maintaining accurate inventory records and optimizing inventory levels, farmers can streamline their operations and achieve greater success in their farming endeavors." },
   { question: "Is the inventory management feature customizable?", answer: "Yes, the inventory management feature is customizable to suit the unique needs and preferences of individual farmers. Users can customize settings, categories, labels, and reports according to their specific requirements, ensuring that the system aligns with their farm management practices and workflows." },
   { question: "Can I access the inventory management feature from my mobile device?", answer: "Yes, the inventory management feature is accessible from both desktop and mobile devices, allowing farmers to manage their inventory anytime, anywhere. Whether you're in the field, at home, or on the go, you can easily track and manage your inventory using our user-friendly platform." },
 
   // Commodity Trading
   { question: "What commodities can I buy on the platform?", answer: "You can buy a wide range of agricultural commodities on our platform, including seeds, fertilizers, pesticides, farm equipment, livestock feed, and more. We offer a diverse selection of high-quality products sourced from trusted suppliers and manufacturers to meet the needs of farmers across various regions and crops." },
   { question: "Are the commodities offered on the platform affordable?", answer: "Yes, we strive to offer agricultural commodities at competitive and affordable prices to support the needs of farmers and promote sustainable agriculture. We work directly with suppliers and manufacturers to negotiate favorable pricing and pass on the savings to our customers, ensuring that they get the best value for their money." },
   { question: "How can I purchase commodities on the platform?", answer: "To purchase commodities on the platform, simply log in to your account and navigate to the 'Marketplace' or 'Shop' section. Here, you can browse through the available products, select the items you wish to purchase, and add them to your cart. Follow the checkout process to complete your order, and your commodities will be delivered to your doorstep." },
   { question: "Are there any discounts or promotions available for commodity purchases?", answer: "Yes, we occasionally offer discounts, promotions, and special deals on agricultural commodities to provide additional value to our customers. Keep an eye out for exclusive offers and seasonal discounts on our platform, and take advantage of the savings to enhance your farming operations and profitability." },
   { question: "Can I track the status of my commodity orders?", answer: "Yes, you can track the status of your commodity orders by accessing your order history on the platform. Once your order is placed, you will receive updates on its processing, shipping, and delivery status, allowing you to stay informed and plan accordingly." }

]; 

const questions = data.map(entry => entry.question);
const answers = data.map(entry => entry.answer);

export function trainClassifier() {
  const classifier = new natural.BayesClassifier();
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const answer = answers[i];
    classifier.addDocument(question, answer);
  }
  classifier.train();
  return classifier;
}

export function handleChatMessage(classifier, message) {
  const predictedAnswer = classifier.classify(message);
  return predictedAnswer;
}
