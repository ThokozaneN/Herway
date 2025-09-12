// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// Cart functionality
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');

cartIcon.addEventListener('click', function() {
    cartModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', function() {
    cartModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

overlay.addEventListener('click', function() {
    cartModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Product card animations
function checkVisibility() {
    const elements = document.querySelectorAll('.product-card');
    
    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 150);
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Here you would normally filter products
        // For demo purposes, we'll just simulate filtering
        simulateFiltering(this.textContent.trim());
    });
});

// Add to cart functionality
const addToCartBtns = document.querySelectorAll('.action-btn:first-child');
const cartCount = document.querySelector('.cart-count');
let count = 3; // Starting with 3 items in cart for demo

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        count++;
        cartCount.textContent = count;
        
        // Animation for cart icon
        cartIcon.classList.add('animate');
        setTimeout(() => {
            cartIcon.classList.remove('animate');
        }, 500);
        
        // Get product info (in a real app, this would come from data attributes)
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;
        const productImage = productCard.querySelector('img').src;
        
        // Add to cart modal (simplified for demo)
        addToCartModal(productName, productPrice, productImage);
    });
});

// Cart item management
function setupCartItemEvents() {
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    const removeBtns = document.querySelectorAll('.remove-item');
    
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const quantityElement = this.parentElement.querySelector('.cart-item-quantity');
            let quantity = parseInt(quantityElement.textContent);
            
            if (this.textContent === '+') {
                quantity++;
            } else if (this.textContent === '-' && quantity > 1) {
                quantity--;
            }
            
            quantityElement.textContent = quantity;
            updateCartTotal();
        });
    });
    
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.remove();
            count--;
            cartCount.textContent = count;
            updateCartTotal();
        });
    });
}

// Update cart total
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('.cart-item-price').textContent;
        const price = parseFloat(priceText.replace('$', ''));
        const quantity = parseInt(item.querySelector('.cart-item-quantity').textContent);
        total += price * quantity;
    });
    
    document.querySelector('.cart-total span:last-child').textContent = '$' + total.toFixed(2);
}

// Simulate filtering (for demo purposes)
function simulateFiltering(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        product.style.opacity = '0.5';
        product.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
        }, 300);
    });
    
    // Show a filtering message (in a real app, this would actually filter)
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.backgroundColor = 'var(--accent)';
    message.style.color = 'white';
    message.style.padding = '15px 30px';
    message.style.borderRadius = '4px';
    message.style.zIndex = '1002';
    message.textContent = `Filtering by: ${category}`;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 1000);
}

// Add item to cart modal (simplified for demo)
function addToCartModal(name, price, image) {
    const cartItems = document.querySelector('.cart-items');
    
    const newItem = document.createElement('div');
    newItem.classList.add('cart-item');
    newItem.innerHTML = `
        <img src="${image}" alt="Product" class="cart-item-image">
        <div class="cart-item-details">
            <h4 class="cart-item-title">${name}</h4>
            <div class="cart-item-price">${price}</div>
            <div class="cart-item-actions">
                <button class="quantity-btn">-</button>
                <span class="cart-item-quantity">1</span>
                <button class="quantity-btn">+</button>
                <button class="remove-item">Remove</button>
            </div>
        </div>
    `;
    
    cartItems.appendChild(newItem);
    setupCartItemEvents();
    updateCartTotal();
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    setupCartItemEvents();
    updateCartTotal();
});