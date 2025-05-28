// Contact Form - Isolated JavaScript
(function() {
	'use strict';
	
	// Wait for DOM to be ready
	function cfReady(fn) {
			if (document.readyState !== 'loading') {
					fn();
			} else {
					document.addEventListener('DOMContentLoaded', fn);
			}
	}
	
	cfReady(function() {
			const form = document.getElementById('cfContactForm');
			const successMessage = document.getElementById('cfSuccessMessage');
			
			if (!form || !successMessage) return;
			
			// Form submission handler
			form.addEventListener('submit', function(e) {
					e.preventDefault();
					e.stopPropagation();
					
					// Validate form
					if (!cfValidateForm()) {
							return;
					}
					
					// Get form data
					const formData = new FormData(form);
					const data = {
							name: formData.get('name'),
							email: formData.get('email'),
							company: formData.get('company'),
							service: formData.get('service')
					};
					
					// Log form data (replace with actual submission logic)
					console.log('Contact Form submitted:', data);
					
					// Show success message
					successMessage.classList.add('cf-show');
					
					// Reset form
					form.reset();
					
					// Hide success message after 5 seconds
					setTimeout(function() {
							successMessage.classList.remove('cf-show');
					}, 5000);
					
					// Here you would typically send the data to your server
					// Example:
					// fetch('/submit-contact', {
					//     method: 'POST',
					//     headers: {
					//         'Content-Type': 'application/json',
					//     },
					//     body: JSON.stringify(data)
					// })
					// .then(response => response.json())
					// .then(result => {
					//     console.log('Success:', result);
					//     successMessage.classList.add('cf-show');
					//     form.reset();
					// })
					// .catch(error => {
					//     console.error('Error:', error);
					//     alert('There was an error sending your message. Please try again.');
					// });
			});
			
			// Add input animation effects
			const inputs = form.querySelectorAll('.cf-input, .cf-select');
			
			inputs.forEach(function(input) {
					input.addEventListener('focus', function() {
							this.parentElement.classList.add('cf-focused');
					});
					
					input.addEventListener('blur', function() {
							this.parentElement.classList.remove('cf-focused');
					});
			});
			
			// Form validation function
			function cfValidateForm() {
					const name = document.getElementById('cf-name').value.trim();
					const email = document.getElementById('cf-email').value.trim();
					
					if (!name) {
							alert('Please enter your name');
							document.getElementById('cf-name').focus();
							return false;
					}
					
					if (!email) {
							alert('Please enter your email');
							document.getElementById('cf-email').focus();
							return false;
					}
					
					if (!cfIsValidEmail(email)) {
							alert('Please enter a valid email address');
							document.getElementById('cf-email').focus();
							return false;
					}
					
					return true;
			}
			
			// Email validation function
			function cfIsValidEmail(email) {
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					return emailRegex.test(email);
			}
	});
})();