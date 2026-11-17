/**
 * Akhilesh Chaubey - Modern Multi-Page Portfolio Logic
 * Handles 3D Toggle, Lightbox Previews, Typing Animation, Skills Filter, Resume Modal & Contact Form
 */

// 3D Effects Toggle (Allows user to easily turn 3D effect ON / OFF)
function init3DToggle() {
  const toggleBtn = document.getElementById('toggle-3d-btn');
  const statusText = document.getElementById('text-3d-status');
  const canvas = document.getElementById('three-cursor-canvas');
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');

  let is3DEnabled = true;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      is3DEnabled = !is3DEnabled;

      if (window.ambientTech3D) {
        window.ambientTech3D.enabled = is3DEnabled;
      }

      if (canvas) {
        canvas.style.display = is3DEnabled ? 'block' : 'none';
      }
      if (dot) dot.style.display = is3DEnabled ? 'block' : 'none';
      if (ring) ring.style.display = is3DEnabled ? 'block' : 'none';

      if (statusText) {
        statusText.textContent = is3DEnabled ? '3D: ON' : '3D: OFF';
      }

      if (is3DEnabled) {
        toggleBtn.classList.remove('opacity-60');
      } else {
        toggleBtn.classList.add('opacity-60');
      }
    });
  }
}

// Image Lightbox Viewer
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !imgEl) return;

  document.querySelectorAll('.project-img-frame').forEach(frame => {
    frame.addEventListener('click', () => {
      const img = frame.querySelector('img');
      const title = frame.dataset.title || img.getAttribute('alt') || 'Project Preview';
      imgEl.src = img.src;
      titleEl.textContent = title;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

// Typing Effect for Hero Subtitle
function initTyping() {
  const words = [
    'MCA Scholar @ KIET Deemed to be University',
    'Creator of DrishtiRakshak AI Surveillance Ecosystem',
    'Full-Stack Developer (PHP, Python, Java, JavaScript)',
    'Architect of College Event Management System (CEMS)',
    'Developer of CampusCare Civic Redressal Portal'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const target = document.getElementById('typing-text');
  if (!target) return;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 25 : 60;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 350;
    }

    setTimeout(type, speed);
  }

  type();
}

// Skills Category Filter
function initSkillsFilter() {
  const buttons = document.querySelectorAll('.skill-filter-btn');
  const items = document.querySelectorAll('.skill-item');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('bg-emerald-700', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });
      btn.classList.add('bg-emerald-700', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      const category = btn.dataset.category;

      items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
          item.classList.add('fade-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Resume Modal & Print (Auto-injected on all pages for seamless access)
function initResumeModal() {
  let modal = document.getElementById('resume-modal');

  // If modal is not present on this page, dynamically inject it so Resume button works everywhere!
  if (!modal) {
    const modalHTML = `
      <div id="resume-modal" class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md hidden items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div class="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border-2 border-emerald-500/30 my-auto">
          
          <div class="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-3xl">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md font-extrabold">
                <i class="fas fa-file-invoice"></i>
              </div>
              <div>
                <h3 class="font-extrabold text-black text-xl">Akhilesh Chaubey — Official Curriculum Vitae</h3>
                <p class="text-sm text-emerald-800 font-extrabold">KIET Deemed to be University, MCA Scholar</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button id="print-resume-btn" class="btn-secondary !py-2.5 !px-5 text-sm font-bold flex items-center gap-2" title="Print / Save as PDF">
                <i class="fas fa-print text-emerald-600 text-base"></i>
                <span>Print / Save PDF</span>
              </button>
              <button id="close-resume-btn" class="w-10 h-10 rounded-xl bg-slate-200 hover:bg-red-500 hover:text-white text-slate-700 flex items-center justify-center transition-all text-lg font-bold">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <div class="p-8 sm:p-10 overflow-y-auto space-y-7 text-base text-black leading-relaxed font-sans">
            <div class="text-center pb-6 border-b-2 border-slate-200">
              <h1 class="text-3xl sm:text-4xl font-extrabold text-black">Akhilesh Chaubey</h1>
              <p class="text-base text-slate-800 font-bold mt-1">Haldwani, Uttarakhand | chaubeyakhilesh51@gmail.com | +91 9759790023 / 9389977845</p>
              <div class="flex justify-center gap-6 text-sm font-extrabold mt-3 text-emerald-800">
                <a href="https://linkedin.com/in/akhilesh-chaubey-799277243" target="_blank" class="hover:underline flex items-center gap-1.5"><i class="fab fa-linkedin"></i> LinkedIn</a>
                <span>•</span>
                <a href="https://github.com/akhileshchaubey51" target="_blank" class="hover:underline flex items-center gap-1.5"><i class="fab fa-github"></i> GitHub</a>
              </div>
            </div>

            <div>
              <h2 class="text-xl font-extrabold text-emerald-800 uppercase tracking-wider mb-2">Professional Objective</h2>
              <p class="text-base text-black leading-relaxed font-medium">
                Dedicated and self-motivated MCA Scholar eager to engineer high-impact software, scalable backend architectures, 
                and edge AI computer vision platforms. Committed to delivering high-performance solutions, collaborative teamwork, 
                and continuous technological advancement.
              </p>
            </div>

            <div>
              <h2 class="text-xl font-extrabold text-emerald-800 uppercase tracking-wider mb-3">Education</h2>
              <div class="space-y-3.5 text-base font-semibold">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div><strong class="text-black text-lg">KIET Deemed to be University</strong> — Master of Computer Application (MCA)</div>
                  <span class="font-extrabold text-emerald-800 text-sm mt-1 sm:mt-0">Aug 2026 – June 2028</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div><strong class="text-black text-lg">Graphic Era Hill University</strong> — Bachelor of Computer Application (BCA)</div>
                  <span class="font-extrabold text-emerald-800 text-sm mt-1 sm:mt-0">Aug 2023 – June 2026</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div><strong class="text-black text-lg">Vivekanand Vidya Mandir, Bageshwar</strong> — Senior Secondary (Class XII)</div>
                  <span class="font-extrabold text-emerald-800 text-sm mt-1 sm:mt-0">2022 – 2023</span>
                </div>
              </div>
            </div>

            <div>
              <h2 class="text-xl font-extrabold text-emerald-800 uppercase tracking-wider mb-3">Key Projects</h2>
              <div class="space-y-4">
                <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <h4 class="font-extrabold text-black text-lg">DrishtiRakshak AI — Dual-App Edge Surveillance</h4>
                    <a href="https://github.com/akhileshchaubey51/drishti-rakshak-ai" target="_blank" class="text-sm font-extrabold text-emerald-800 hover:underline">GitHub &rarr;</a>
                  </div>
                  <p class="text-sm text-slate-700 mt-1">Android Native (Java/Kotlin), CameraX, MobileNet edge face detection, sub-second sirens, Firestore & Cloudinary.</p>
                </div>
                <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <h4 class="font-extrabold text-black text-lg">College Event Management System (CEMS)</h4>
                    <a href="https://github.com/akhileshchaubey51/akhileshchaubey51-College-Event-management-System" target="_blank" class="text-sm font-extrabold text-emerald-800 hover:underline">GitHub &rarr;</a>
                  </div>
                  <p class="text-sm text-slate-700 mt-1">PHP, MySQL, JavaScript, Bootstrap. Event registration, automated QR payment handling, admin verification.</p>
                </div>
                <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <h4 class="font-extrabold text-black text-lg">CampusCare — College Grievance Resolution</h4>
                    <a href="https://github.com/akhileshchaubey51/Smart_Civic_Problem_Reporting_System" target="_blank" class="text-sm font-extrabold text-emerald-800 hover:underline">GitHub &rarr;</a>
                  </div>
                  <p class="text-sm text-slate-700 mt-1">Python, Flask, MS SQL Server, Tailwind CSS, Chart.js. Student issue ticketing, photo upload, SLA workflow.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modal = document.getElementById('resume-modal');
  }

  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('close-resume-btn');
  const printBtn = document.getElementById('print-resume-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// Contact Form & Copy Email
function initContact() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');
  const copyBtn = document.getElementById('copy-email-btn');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-4');
    }, 3500);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('chaubeyakhilesh51@gmail.com');
      showToast('Copied email to clipboard!');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const msg = document.getElementById('form-message').value;

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Akhilesh,\n\n${msg}\n\nFrom: ${name} (${email})`);
      window.open(`mailto:chaubeyakhilesh51@gmail.com?subject=${subject}&body=${body}`, '_blank');

      showToast(`Thank you ${name}! Launching email client...`);
      form.reset();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init3DToggle();
  initLightbox();
  initTyping();
  initSkillsFilter();
  initResumeModal();
  initContact();
});
