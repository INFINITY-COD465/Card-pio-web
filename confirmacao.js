function finalizarPedido() {
    window.location.href = 'confirmacao.html';
}


  function enviarPedido(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let mensagem = `*NOVO PEDIDO - MAGIC BURGUER* \n\n`;
    mensagem += `*Cliente:* ${formData.get('nome-completo')}\n`;
    mensagem += `*Telefone:* ${formData.get('numero-telefone')}\n`;
    mensagem += `*Endereço:* ${formData.get('endereco')}, ${formData.get('numero')}`;
    mensagem += formData.get('complemento') ? ` (${formData.get('complemento')})\n` : '\n';
    mensagem += `*CEP:* ${formData.get('cep')}\n`;
    mensagem += `*Pagamento:* ${formData.get('forma-pagamento')}\n\n`;
    mensagem += `*Itens do Pedido:*\n`;
    cartItems.forEach(item => {
        mensagem += `➤ ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    mensagem += `\n*Total:* R$ ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}`;
    const encodedMsg = encodeURIComponent(mensagem);
    const phoneNumber = '5511949995382'; // Número de telefone no formato correto
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank');
    localStorage.removeItem('cart');
}