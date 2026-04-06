(function initChatbotWidget() {
  const CHATBOT_TEXT = 'Jahanpanah ! Ask your question and I shall answer with wit.';

  function ensureGreeting(messageList) {
    if (!messageList) return;

    const alreadyPresent = Array.from(messageList.querySelectorAll('.message.bot'))
      .some((bubble) => bubble.textContent.trim() === CHATBOT_TEXT);

    if (alreadyPresent) return;

    const bubble = document.createElement('div');
    bubble.className = 'message bot chatbot-click-greeting';
    bubble.textContent = CHATBOT_TEXT;
    messageList.appendChild(bubble);
    messageList.scrollTop = messageList.scrollHeight;
  }

  function getOrCreateHint() {
    let hint = document.querySelector('.chatbot-hint');
    if (!hint) {
      hint = document.createElement('div');
      hint.className = 'chatbot-hint';
      document.body.appendChild(hint);
    }
    return hint;
  }

  function showHintFor(button, text) {
    const hint = getOrCreateHint();
    const rect = button.getBoundingClientRect();

    hint.textContent = text;
    hint.classList.add('show');
    hint.style.left = `${Math.max(12, rect.left - 220 + rect.width)}px`;
    hint.style.top = `${Math.max(12, rect.top - 70)}px`;

    window.clearTimeout(window.__chatbotHintTimeout);
    window.__chatbotHintTimeout = window.setTimeout(() => {
      hint.classList.remove('show');
    }, 1300);
  }

  function openDashboardChat(href) {
    if (href) {
      window.location.href = href;
      return;
    }
    window.location.href = 'dashboard.html?openBirbal=1';
  }

  function openInlineBirbal() {
    const panel = document.getElementById('birbalPanel');
    if (!panel) return false;

    panel.classList.add('open');
    const messageList = document.getElementById('messageList');
    ensureGreeting(messageList);

    const input = document.getElementById('birbalInput');
    if (input) input.focus();
    return true;
  }

  function wireButtons() {
    const buttons = document.querySelectorAll('.chatbot-fab');
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        showHintFor(button, CHATBOT_TEXT);

        const useInline = button.getAttribute('data-chatbot-inline') === '1';
        window.setTimeout(() => {
          if (useInline && openInlineBirbal()) return;
          openDashboardChat(button.getAttribute('href'));
        }, 420);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireButtons);
  } else {
    wireButtons();
  }

  const query = new URLSearchParams(window.location.search);
  if (query.get('openBirbal') === '1') {
    ensureGreeting(document.getElementById('messageList'));
  }
})();
