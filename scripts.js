// Shared Data Structure
const shopEasyDB = {
  products: [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      image: "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg",
      category: "Electronics"
    },
    {
      id: 3,
      name: "Coffee Maker",
      price: 149.99,
      image: "https://images.pexels.com/photos/214487/pexels-photo-214487.jpeg",
      category: "Home"
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 79.99,
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
      category: "Electronics"
    }
  ],
  orders: [],
  riders: [
    {
      id: 1,
      name: "John Doe",
      vehicle: "Motorcycle",
      status: "available"
    }
  ]
};

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
  const product = shopEasyDB.products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
}

function updateCartCount() {
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(el => {
    el.textContent = cart.length;
  });
}

// Order Management
function generateOrderId() {
  return 'SE-' + Math.floor(10000 + Math.random() * 90000);
}

function createOrder(customerInfo) {
  const order = {
    id: generateOrderId(),
    customer: customerInfo,
    items: [...cart],
    status: "ready",
    createdAt: new Date().toISOString(),
    riderId: null,
    deliveryAddress: customerInfo.address
  };
  
  shopEasyDB.orders.push(order);
  localStorage.setItem('orders', JSON.stringify(shopEasyDB.orders));
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  return order.id;
}

function getOrder(orderId) {
  return shopEasyDB.orders.find(order => order.id === orderId);
}

function updateOrderStatus(orderId, status) {
  const order = getOrder(orderId);
  if (order) {
    order.status = status;
    if (status === 'picked') {
      order.riderId = 1; // Assign to first rider
    }
    localStorage.setItem('orders', JSON.stringify(shopEasyDB.orders));
    return true;
  }
  return false;
}

// Rider Functions
function getRiderOrders(riderId) {
  return shopEasyDB.orders.filter(order => 
    order.riderId === riderId || 
    (order.riderId === null && order.status === 'ready')
  );
}

// Map Simulation
function initMap() {
    console.log("Map would be initialized here with actual API key");
    // This would be replaced with actual Google Maps API code
}

// Simulate new order creation for demo purposes
function simulateNewOrder() {
    if (Math.random() > 0.7) { // 30% chance of new order
        const customers = [
            {firstName: "Sarah", lastName: "Johnson", address: "456 Oak Avenue, Apt 3B"},
            {firstName: "Michael", lastName: "Brown", address: "789 Pine Street, Floor 5"},
            {firstName: "Emily", lastName: "Wilson", address: "321 Maple Road, Unit 12"}
        ];
        
        const customer = customers[Math.floor(Math.random() * customers.length)];
        const items = [];
        const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items
        
        for (let i = 0; i < numItems; i++) {
            const randomProduct = shopEasyDB.products[
                Math.floor(Math.random() * shopEasyDB.products.length)
            ];
            items.push(randomProduct);
        }
        
        const order = {
            id: generateOrderId(),
            customer: {
                ...customer,
                email: `${customer.firstName.toLowerCase()}@example.com`,
                phone: `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
                city: "Metropolis",
                postalCode: "10001",
                paymentMethod: "credit-card"
            },
            items: items,
            status: "ready",
            createdAt: new Date().toISOString(),
            riderId: null,
            deliveryAddress: customer.address
        };
        
        shopEasyDB.orders.push(order);
        localStorage.setItem('orders', JSON.stringify(shopEasyDB.orders));
        
        // Show notification
        if (document.getElementById('notifications')) {
            const notifications = document.getElementById('notifications');
            const notification = document.createElement('div');
            notification.className = 'p-4 hover:bg-gray-50';
            notification.innerHTML = `
                <div class="flex items-start">
                    <div class="flex-shrink-0 pt-0.5">
                        <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <i class="fas fa-bell text-blue-600"></i>
                        </div>
                    </div>
                    <div class="ml-3 flex-1">
                        <p class="text-sm font-medium text-gray-900">New order assigned</p>
                        <p class="text-sm text-gray-500">${order.id} has been assigned to you</p>
                        <p class="mt-1 text-xs text-gray-400">Just now</p>
                    </div>
                </div>
            `;
            notifications.insertBefore(notification, notifications.firstChild);
        }
    }
}

// Generate initial mock orders
function generateInitialOrders() {
  const customers = [
    {firstName: "Sarah", lastName: "Johnson", address: "456 Oak Avenue, Apt 3B", city: "Metropolis", postalCode: "10001"},
    {firstName: "Michael", lastName: "Brown", address: "789 Pine Street, Floor 5", city: "Metropolis", postalCode: "10001"},
    {firstName: "Emily", lastName: "Wilson", address: "321 Maple Road, Unit 12", city: "Metropolis", postalCode: "10001"}
  ];
  
  // Clear existing orders
  shopEasyDB.orders = [];
  
  // Create 3 initial orders
  for (let i = 0; i < 3; i++) {
    const customer = customers[i];
    const items = [];
    const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items
    
    for (let j = 0; j < numItems; j++) {
      const randomProduct = shopEasyDB.products[
        Math.floor(Math.random() * shopEasyDB.products.length)
      ];
      items.push(randomProduct);
    }
    
    const order = {
      id: generateOrderId(),
      customer: {
        ...customer,
        email: `${customer.firstName.toLowerCase()}@example.com`,
        phone: `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
        paymentMethod: "credit-card"
      },
      items: items,
      status: "ready",
      createdAt: new Date().toISOString(),
      riderId: null,
      deliveryAddress: customer.address
    };
    
    shopEasyDB.orders.push(order);
  }
  localStorage.setItem('orders', JSON.stringify(shopEasyDB.orders));
}

// Order rendering function
function renderOrders() {
  const orders = getRiderOrders(1); // Using rider ID 1 for demo
  const ordersContainer = document.getElementById('orders-container');
  
  if (!ordersContainer) return;

  if (orders.length === 0) {
    ordersContainer.innerHTML = `
      <div class="p-6 text-center text-gray-500">
        <i class="fas fa-box-open text-4xl mb-2"></i>
        <p>No active orders at the moment</p>
      </div>
    `;
    return;
  }

  ordersContainer.innerHTML = '';
  orders.forEach(order => {
    const orderElement = document.createElement('div');
    orderElement.className = 'p-6 hover:bg-gray-50 cursor-pointer';
    orderElement.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-medium">Order #${order.id}</h3>
          <p class="text-sm text-gray-500">${order.customer.firstName} ${order.customer.lastName}</p>
        </div>
        <span class="px-2 py-1 text-xs font-medium rounded-full 
          ${order.status === 'ready' ? 'bg-blue-100 text-blue-800' : 
            order.status === 'picked' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-green-100 text-green-800'}">
          ${order.status}
        </span>
      </div>
      <div class="mt-4">
        <p class="text-sm"><i class="fas fa-map-marker-alt text-blue-500 mr-2"></i>${order.deliveryAddress}</p>
        <p class="text-sm mt-2"><i class="fas fa-clock text-gray-500 mr-2"></i>Placed at ${new Date(order.createdAt).toLocaleTimeString()}</p>
      </div>
      <div class="mt-4 flex space-x-2">
        <button class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200" 
          onclick="viewOrderDetails('${order.id}')">
          Details
        </button>
        ${order.status === 'ready' ? 
          `<button class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200" 
              onclick="pickUpOrder('${order.id}')">
              Pick Up
          </button>` : 
          order.status === 'picked' ? 
          `<button class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200" 
              onclick="deliverOrder('${order.id}')">
              Deliver
          </button>` : ''}
      </div>
    `;
    ordersContainer.appendChild(orderElement);
  });
}

// Order detail functions
function viewOrderDetails(orderId) {
  const order = getOrder(orderId);
  if (!order) return;

  document.getElementById('modal-title').textContent = `Order #${order.id}`;
  
  const itemsHtml = order.items.map(item => `
    <div class="flex justify-between py-2 border-b border-gray-100">
      <div>
        <p class="font-medium">${item.name}</p>
        <p class="text-sm text-gray-500">${item.category}</p>
      </div>
      <p class="font-medium">$${item.price.toFixed(2)}</p>
    </div>
  `).join('');

  document.getElementById('modal-content').innerHTML = `
    <div class="mb-4">
      <h4 class="font-medium text-gray-900 mb-2">Customer Information</h4>
      <p>${order.customer.firstName} ${order.customer.lastName}</p>
      <p class="text-sm text-gray-500">${order.customer.phone}</p>
      <p class="text-sm text-gray-500">${order.customer.email}</p>
    </div>
    <div class="mb-4">
      <h4 class="font-medium text-gray-900 mb-2">Delivery Address</h4>
      <p>${order.deliveryAddress}</p>
      <p class="text-sm text-gray-500">${order.customer.city}, ${order.customer.postalCode}</p>
    </div>
    <div>
      <h4 class="font-medium text-gray-900 mb-2">Order Items</h4>
      ${itemsHtml}
      <div class="flex justify-between py-2 font-bold mt-2">
        <p>Total</p>
        <p>$${order.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
      </div>
    </div>
  `;

  // Show/hide action buttons based on order status
  document.getElementById('pickup-btn').style.display = order.status === 'ready' ? 'block' : 'none';
  document.getElementById('deliver-btn').style.display = order.status === 'picked' ? 'block' : 'none';

  document.getElementById('order-modal').classList.remove('hidden');
}

function pickUpOrder(orderId) {
  updateOrderStatus(orderId, 'picked');
  renderOrders();
  document.getElementById('order-modal').classList.add('hidden');
}

function deliverOrder(orderId) {
  updateOrderStatus(orderId, 'delivered');
  renderOrders();
  document.getElementById('order-modal').classList.add('hidden');
}

// Enhanced notification system
function showRiderNotification(message) {
  if (document.getElementById('notifications-list')) {
    const notification = document.createElement('div');
    notification.className = 'p-3 mb-2 bg-blue-100 text-blue-800 rounded';
    notification.textContent = message;
    document.getElementById('notifications-list').prepend(notification);
    
    // Update notification count
    const countElement = document.getElementById('notification-count');
    const currentCount = parseInt(countElement.textContent) || 0;
    countElement.textContent = currentCount + 1;
    countElement.classList.remove('hidden');
  }
}

// Run order simulation every 10-30 seconds
setInterval(simulateNewOrder, Math.floor(10000 + Math.random() * 20000));

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  updateCartCount();
  generateInitialOrders();
  
  // Log generated orders
  console.log('Generated orders:', shopEasyDB.orders);
  
  // Initialize map if element exists
  if (document.getElementById('map')) {
    console.log('Initializing map');
    initMap();
  }
  
  // Initialize rider dashboard if element exists
  const ordersContainer = document.getElementById('orders-container');
  if (ordersContainer) {
    console.log('Found orders container');
    // Assign first rider by default
    if (!localStorage.getItem('currentRider')) {
      localStorage.setItem('currentRider', JSON.stringify(shopEasyDB.riders[0]));
    }
    // Render orders immediately
    console.log('Rendering orders');
    renderOrders();
  } else {
    console.log('Orders container not found');
  }
});
