// EmailJS Configuration and Form Handler
class EmailHandler {
    constructor() {
        this.serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
        this.templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
        this.publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
        this.init();
    }

    init() {
        // Initialize EmailJS
        emailjs.init(this.publicKey);
        
        // Bind form submission
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = document.getElementById('submit-btn');
        const statusDiv = document.getElementById('form-status');
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_email: 'madhaarif9@gmail.com' // Your email
        };

        // Validate form
        if (!this.validateForm(data)) {
            this.showStatus('Please fill all fields correctly', 'error');
            return;
        }

        // Show loading state
        this.setLoadingState(submitBtn, statusDiv, true);

        try {
            // Send email via EmailJS
            const response = await emailjs.send(
                this.serviceID,
                this.templateID,
                data
            );

            console.log('Email sent successfully:', response);
            this.showStatus('🚀 Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // Store message locally as backup
            this.storeMessageLocally(data);
            
        } catch (error) {
            console.error('Email sending failed:', error);
            this.showStatus('❌ Failed to send message. Please try again or contact directly.', 'error');
        } finally {
            this.setLoadingState(submitBtn, statusDiv, false);
        }
    }

    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return data.from_name.trim() !== '' &&
               data.from_email.trim() !== '' &&
               emailRegex.test(data.from_email) &&
               data.subject.trim() !== '' &&
               data.message.trim() !== '';
    }

    setLoadingState(button, statusDiv, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
            this.showStatus('📤 Sending your message...', 'loading');
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showStatus(message, type) {
        const statusDiv = document.getElementById('form-status');
        statusDiv.textContent = message;
        statusDiv.className = `form-status ${type} show`;
        
        // Auto hide after 5 seconds for success/error
        if (type !== 'loading') {
            setTimeout(() => {
                statusDiv.classList.remove('show');
            }, 5000);
        }
    }

    storeMessageLocally(data) {
        try {
            const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            messages.push({
                ...data,
                timestamp: new Date().toISOString(),
                id: Date.now()
            });
            
            // Keep only last 50 messages
            if (messages.length > 50) {
                messages.splice(0, messages.length - 50);
            }
            
            localStorage.setItem('portfolio_messages', JSON.stringify(messages));
        } catch (error) {
            console.error('Failed to store message locally:', error);
        }
    }

    // Method to retrieve stored messages (for admin panel)
    getStoredMessages() {
        try {
            return JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        } catch (error) {
            console.error('Failed to retrieve stored messages:', error);
            return [];
        }
    }
}

// Alternative: Simple form handler without EmailJS
class SimpleFormHandler {
    constructor() {
        this.init();
    }

    init() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        // Store in localStorage
        this.storeMessage(data);
        
        // Show success message
        this.showStatus('✅ Message saved! Check browser console for details.', 'success');
        
        // Log to console
        console.log('📧 New Contact Form Submission:', data);
        
        // Reset form
        form.reset();
    }

    storeMessage(data) {
        try {
            const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
            messages.push({ ...data, id: Date.now() });
            localStorage.setItem('contact_messages', JSON.stringify(messages));
            
            // Also log to console for immediate viewing
            console.table(data);
        } catch (error) {
            console.error('Failed to store message:', error);
        }
    }

    showStatus(message, type) {
        const statusDiv = document.getElementById('form-status');
        statusDiv.textContent = message;
        statusDiv.className = `form-status ${type} show`;
        
        setTimeout(() => {
            statusDiv.classList.remove('show');
        }, 5000);
    }
}

// Initialize the appropriate handler
document.addEventListener('DOMContentLoaded', () => {
    // Check if EmailJS is available
    if (typeof emailjs !== 'undefined') {
        console.log('🚀 EmailJS detected - Initializing email handler');
        new EmailHandler();
    } else {
        console.log('📝 EmailJS not available - Using simple form handler');
        new SimpleFormHandler();
    }
});

// Admin panel to view messages (accessible via browser console)
window.viewMessages = function() {
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    if (messages.length === 0) {
        console.log('📭 No messages found');
        return;
    }
    
    console.log(`📬 Found ${messages.length} messages:`);
    console.table(messages);
    return messages;
};

// Clear all stored messages
window.clearMessages = function() {
    localStorage.removeItem('contact_messages');
    console.log('🗑️ All messages cleared');
};

console.log(`
📧 Contact Form Handler Loaded!

Available commands:
- viewMessages() - View all submitted messages
- clearMessages() - Clear all stored messages

Form data will be stored in browser localStorage and logged to console.
`);