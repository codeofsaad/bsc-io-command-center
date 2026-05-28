// Shared components for IO Unified Command Center

// Agentforce Analytics Panel
function initAgentforce() {
  const panel = document.getElementById('agentforce-panel');
  const btn = document.getElementById('agentforce-btn');
  const closeBtn = document.getElementById('agentforce-close');
  const input = document.getElementById('agentforce-input');
  const sendBtn = document.getElementById('agentforce-send');
  const chatArea = document.getElementById('agentforce-chat');

  const suggestedQuestions = [
    {
      q: "Which accounts have dropping TheraSphere volumes?",
      a: "Three accounts show declining TheraSphere procedure volumes this quarter:\n\n• **Stanford Medical Center** — Down 35% (from 38 to 18 procedures/month). Root cause: PI departure in August, new physician still ramping.\n• **Mount Sinai Hospital** — Down 42% (from 22 to 10 procedures/month). Competitive displacement by Sirtex noted.\n• **Cedars-Sinai** — Down 48% (from 18 to 8 procedures/month). Contract renewal stalled in procurement.\n\n**Recommended action:** Prioritize rep visits to Stanford (highest recovery potential) and escalate Cedars-Sinai contract to regional VP."
    },
    {
      q: "What's causing LEGACY-IV enrollment delays?",
      a: "LEGACY-IV is at 26% enrollment (210/800 patients) — significantly behind plan. Key factors:\n\n• **Site activation gap:** Only 42 of 75 planned sites are active (56%). 14 EMEA sites pending regulatory approval.\n• **Narrow inclusion criteria:** Protocol amendment #3 tightened eligibility, reducing screen-to-consent rate to 61% (vs 79% portfolio average).\n• **Competing trials:** 3 new competitor trials launched in same indication (cholangiocarcinoma) in Q3.\n\n**Recommendation:** Expedite pending site activations and consider protocol amendment to broaden inclusion criteria. Estimated recovery to 50% enrollment by Q2 2025 if 10+ sites activate within 60 days."
    },
    {
      q: "Show me the dose-response relationship for ≥400 Gy patients",
      a: "Patients receiving tumor absorbed dose ≥400 Gy show significantly improved outcomes:\n\n• **ORR:** 78% (vs 52% for <400 Gy) — a 26pp absolute difference\n• **Median OS:** 26.3 months (vs 14.1 months for <400 Gy)\n• **Median TTP:** 19.2 months (vs 10.8 months)\n\nThe dose-response curve shows a clear inflection point at ~380 Gy, with diminishing returns above 520 Gy but increased Grade 3+ AE risk (18% above 520 Gy vs 11% at 400-520 Gy).\n\n**Clinical implication:** Optimal therapeutic window appears to be 400-520 Gy for best efficacy/safety balance."
    },
    {
      q: "Which hubs need immediate reorder action?",
      a: "Four products require immediate reorder attention:\n\n🔴 **CRITICAL (< 2 days supply):**\n• Obsidio — NA East Hub: 8 units remaining, 1 day supply. **EXPEDITE order placed, ETA 18 hrs.**\n• TheraSphere — EU Central Hub: 14 units, 2 days supply. MedLogistics Pro shipment recommended.\n\n🟠 **WARNING (< 5 days):**\n• Watchman FLX — NA East Hub: 19 units, 3 days\n• Farapulse — APAC Hub: 32 units, 4 days\n\n**System action:** Auto-reorder triggered for TheraSphere EU Central. Manual approval needed for Obsidio expedite surcharge ($2,400)."
    },
    {
      q: "What's driving the Grade 3+ AE increase at Site 012?",
      a: "Site 012 (Addenbrookes, London) shows Grade 3+ AE rate of 18.4% — significantly above the portfolio average of 12.5%.\n\n**Signal analysis:**\n• Hepatotoxicity accounts for 62% of Grade 3+ events at this site\n• 2 Grade 5 (fatal) events recorded — both in patients with baseline Child-Pugh B liver function\n• Median tumor dose at Site 012 is 485 Gy — 38% higher than portfolio average (352 Gy)\n\n**Root cause hypothesis:** Dosimetry calibration may be running high. Site 012 PI (Dr. Williams) tends toward aggressive dosing in borderline patients.\n\n**Action taken:** Medical monitor review initiated. Site visit scheduled for Jan 15. Enrollment paused pending safety committee review."
    }
  ];

  if (btn) {
    btn.addEventListener('click', () => {
      panel.classList.toggle('hidden');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel.classList.add('hidden');
    });
  }

  function addMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.className = isUser
      ? 'flex justify-end mb-3'
      : 'flex justify-start mb-3';

    const bubble = document.createElement('div');
    bubble.className = isUser
      ? 'bg-[#032D60] text-white px-3 py-2 rounded-lg rounded-br-none max-w-[85%] text-sm'
      : 'bg-white border border-gray-200 text-gray-800 px-3 py-2 rounded-lg rounded-bl-none max-w-[85%] text-sm shadow-sm';

    if (!isUser) {
      bubble.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/• /g, '&bull; ');
    } else {
      bubble.textContent = text;
    }

    msgDiv.appendChild(bubble);
    chatArea.appendChild(msgDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function handleQuestion(question) {
    addMessage(question, true);

    // Remove suggestion chips
    const chips = document.getElementById('agentforce-suggestions');
    if (chips) chips.remove();

    // Find matching answer
    const match = suggestedQuestions.find(sq => sq.q === question);

    setTimeout(() => {
      // Show typing indicator
      const typing = document.createElement('div');
      typing.className = 'flex justify-start mb-3';
      typing.id = 'typing-indicator';
      typing.innerHTML = '<div class="bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-400 shadow-sm"><span class="animate-pulse">Analyzing data...</span></div>';
      chatArea.appendChild(typing);
      chatArea.scrollTop = chatArea.scrollHeight;

      setTimeout(() => {
        typing.remove();
        if (match) {
          addMessage(match.a, false);
        } else {
          addMessage("I've analyzed the relevant datasets. Based on the current data, I'd need to run a more detailed query. Let me pull up the specific metrics for you. In the meantime, you can explore the dashboard modules above for real-time insights.", false);
        }
        showFollowUpSuggestions();
      }, 1500);
    }, 500);
  }

  function showFollowUpSuggestions() {
    const remaining = suggestedQuestions.slice(2, 4);
    if (remaining.length > 0) {
      const followUp = document.createElement('div');
      followUp.className = 'mt-2 flex flex-wrap gap-1';
      remaining.forEach(sq => {
        const chip = document.createElement('button');
        chip.className = 'text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors text-left';
        chip.textContent = sq.q.substring(0, 40) + '...';
        chip.addEventListener('click', () => {
          followUp.remove();
          handleQuestion(sq.q);
        });
        followUp.appendChild(chip);
      });
      chatArea.appendChild(followUp);
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  }

  // Render initial suggestion chips
  const suggestionsDiv = document.getElementById('agentforce-suggestions');
  if (suggestionsDiv) {
    suggestedQuestions.slice(0, 3).forEach(sq => {
      const chip = document.createElement('button');
      chip.className = 'w-full text-left text-xs bg-[#f0f7ff] hover:bg-[#ddeeff] text-[#032D60] px-3 py-2 rounded-lg transition-colors border border-[#032D60]/10';
      chip.textContent = sq.q;
      chip.addEventListener('click', () => handleQuestion(sq.q));
      suggestionsDiv.appendChild(chip);
    });
  }

  // Handle manual input
  function submitInput() {
    const text = input.value.trim();
    if (text) {
      input.value = '';
      handleQuestion(text);
    }
  }

  if (sendBtn) sendBtn.addEventListener('click', submitInput);
  if (input) input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitInput();
  });
}

// Mini sparkline renderer using canvas
function renderSparkline(canvasId, data, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);

  ctx.clearRect(0, 0, w, h);

  // Draw fill
  ctx.beginPath();
  ctx.moveTo(0, h);
  data.forEach((val, i) => {
    const x = i * step;
    const y = h - ((val - min) / range) * (h * 0.8) - h * 0.1;
    if (i === 0) ctx.lineTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fillStyle = color + '15';
  ctx.fill();

  // Draw line
  ctx.beginPath();
  data.forEach((val, i) => {
    const x = i * step;
    const y = h - ((val - min) / range) * (h * 0.8) - h * 0.1;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw endpoint dot
  const lastX = (data.length - 1) * step;
  const lastY = h - ((data[data.length - 1] - min) / range) * (h * 0.8) - h * 0.1;
  ctx.beginPath();
  ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

document.addEventListener('DOMContentLoaded', () => {
  initAgentforce();
});
