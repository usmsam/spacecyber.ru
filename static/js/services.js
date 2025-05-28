function togglePaymentAccordion(header) {
  const content = header.nextElementSibling;
  const isActive = header.classList.contains('payment-active');
  
  if (isActive) {
    header.classList.remove('payment-active');
    content.classList.remove('payment-active');
  } else {
    header.classList.add('payment-active');
    content.classList.add('payment-active');
  }
}