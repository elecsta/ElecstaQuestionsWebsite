/**
 * KTU Resource Portal - Application Controller & Interactive Logic
 * Features:
 * - Scheme, Branch, Year, Semester Filtering
 * - Real-time Subject Search & Global Command Palette (Ctrl+K)
 * - Interactive Authentic Question Paper Viewer (with Zoom, Print, Copy Link)
 * - LocalStorage Persistent Bookmarks
 * - KTU SGPA / CGPA Grade Calculator
 * - Request / Upload Paper Flow
 * - Micro-interactions & Toast Alerts
 */

class KTUPortalApp {
  constructor() {
    // Read and sanitize URL Search Parameters (Strict Whitelist Validation)
    const urlParams = new URLSearchParams(window.location.search);
    const rawScheme = urlParams.get('scheme');
    const rawBranch = urlParams.get('branch');
    const rawSem = urlParams.get('sem');
    const rawTab = urlParams.get('tab');

    const validSchemes = ['2024', '2019'];
    const validBranches = ['CS', 'AD', 'EC', 'EE', 'ME', 'CE'];
    const validSemesters = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];
    const validTabs = ['pyqs', 'notes', 'syllabus', 'saved'];

    const chosenScheme = validSchemes.includes(rawScheme) ? rawScheme : '2024';
    let chosenBranch = validBranches.includes(rawBranch) ? rawBranch : 'CS';
    if (chosenScheme === '2019' && chosenBranch === 'AD') {
      chosenBranch = 'CS';
    }

    this.state = {
      scheme: chosenScheme,
      branch: chosenBranch,
      year: 2,
      sem: validSemesters.includes(rawSem) ? rawSem : 'S3',
      viewTab: validTabs.includes(rawTab) ? rawTab : 'pyqs', // 'pyqs' | 'notes' | 'syllabus' | 'saved'
      subFilter: 'all', // 'all' | 'regular' | 'supply' | 'solved' | 'model'
      inpageSearch: '',
      searchQuery: '',
      zoomLevel: 100,
      savedBookmarks: this.loadBookmarks()
    };

    const sNum = parseInt(this.state.sem.replace('S', ''), 10);
    if (!isNaN(sNum)) {
      this.state.year = Math.ceil(sNum / 2);
    }

    this.initElements();
    this.bindEvents();
    this.renderSelectorControls();
    this.renderPortal();
    this.updateBookmarkBadge();
    this.showSiteMaintenancePopup();
  }

  // Security Sanitization Helper (XSS Prevention)
  escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Site-Wide Under Maintenance Popup on Website Open (Shows only on Index Page)
  showSiteMaintenancePopup() {
    // Only show the startup warning on the index / landing page
    if (this.isRepoPage) {
      return;
    }

    try {
      if (sessionStorage.getItem('site_maintenance_acknowledged') === 'true') {
        return;
      }
    } catch (e) {}

    let modal = document.getElementById('site-maintenance-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.id = 'site-maintenance-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.innerHTML = `
        <div class="modal-container" style="max-width: 470px; text-align: center; border-radius: 16px; overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,0.5); border: 1px solid var(--border-strong);">
          <div class="modal-header" style="justify-content: flex-end; padding: 0.65rem 0.95rem; background: var(--surface-container); border-bottom: 1px solid var(--border-subtle);">
            <button class="btn-icon-square modal-close-btn" type="button" aria-label="Close" style="width: 32px; height: 32px;">
              <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
            </button>
          </div>
          <div class="modal-body" style="padding: 1.85rem 1.6rem 1.35rem 1.6rem; display: flex; flex-direction: column; align-items: center; gap: 0.9rem;">
            <div style="width: 68px; height: 68px; border-radius: 50%; background: rgba(245, 158, 11, 0.14); border: 1.5px solid rgba(245, 158, 11, 0.4); display: flex; align-items: center; justify-content: center;">
              <span class="material-symbols-outlined" style="font-size: 36px; color: #f59e0b;">engineering</span>
            </div>
            <div style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 4px 14px; border-radius: 999px; background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.35); color: #d97706; font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; display: inline-block;"></span>
              PDF Verification in Progress
            </div>
            <h3 style="font-family: var(--font-headline); font-size: 1.35rem; font-weight: 800; color: var(--on-surface); margin: 0; letter-spacing: -0.01em;">
              Notice: PDF Audit &amp; Correction
            </h3>
            <p style="font-size: 0.875rem; color: var(--on-surface-variant); line-height: 1.55; margin: 0;">
              We are currently auditing and updating all question paper PDFs and answer keys to correct any potential errors, missing pages, or wrong files. You can continue exploring question paper previews and syllabus online, but direct PDF downloads are temporarily paused until 100% verified copies are uploaded.
            </p>
            <div style="width: 100%; background: var(--surface-container); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.75rem 0.95rem; font-size: 0.75rem; color: var(--on-surface-muted); text-align: left; display: flex; align-items: flex-start; gap: 0.5rem; margin-top: 0.25rem;">
              <span class="material-symbols-outlined" style="font-size: 18px; color: var(--primary); flex-shrink: 0; margin-top: 1px;">info</span>
              <span>Our team is cross-checking each subject PDF against official KTU valuation schemes to ensure 100% accuracy. Downloads will be restored shortly.</span>
            </div>
          </div>
          <div class="modal-footer" style="justify-content: center; padding: 1rem 1.25rem; background: var(--surface-container); border-top: 1px solid var(--border-subtle);">
            <button class="btn-tech primary modal-close-btn" id="site-maint-ok-btn" type="button" style="min-width: 150px; justify-content: center; padding: 0.7rem 2rem; font-size: 0.95rem; font-weight: 700; border-radius: 8px;">
              OK
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const dismiss = () => {
        modal.classList.remove('active');
        try {
          localStorage.setItem('site_maintenance_acknowledged', 'true');
          sessionStorage.setItem('site_maintenance_acknowledged', 'true');
        } catch (e) {}
      };

      modal.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', dismiss);
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) dismiss();
      });
    }

    // Smooth entry after brief render delay
    setTimeout(() => {
      modal.classList.add('active');
    }, 250);
  }

  // Downloads Under Maintenance Modal & Alert System
  showMaintenanceModal(itemName = '') {
    let modal = document.getElementById('download-maintenance-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.id = 'download-maintenance-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.innerHTML = `
        <div class="modal-container" style="max-width: 480px; text-align: center; border-radius: 14px; overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,0.45);">
          <div class="modal-header" style="justify-content: flex-end; padding: 0.65rem 0.95rem; background: var(--surface-container); border-bottom: 1px solid var(--border-subtle);">
            <button class="btn-icon-square modal-close-btn" type="button" aria-label="Close" style="width: 32px; height: 32px;">
              <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
            </button>
          </div>
          <div class="modal-body" style="padding: 1.75rem 1.6rem 1.25rem 1.6rem; display: flex; flex-direction: column; align-items: center; gap: 0.85rem;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(245, 158, 11, 0.12); border: 1.5px solid rgba(245, 158, 11, 0.35); display: flex; align-items: center; justify-content: center;">
              <span class="material-symbols-outlined" style="font-size: 34px; color: #f59e0b;">construction</span>
            </div>
            <div style="display: inline-flex; align-items: center; gap: 0.35rem; padding: 4px 12px; border-radius: 999px; background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); color: #d97706; font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #f59e0b; display: inline-block;"></span>
              Server Maintenance
            </div>
            <h3 style="font-family: var(--font-headline); font-size: 1.25rem; font-weight: 800; color: var(--on-surface); margin: 0;">
              PDF Verification in Progress
            </h3>
            <p id="maint-item-text" style="font-size: 0.875rem; color: var(--on-surface-variant); line-height: 1.5; margin: 0;">
              This question paper PDF is currently being audited and re-verified to correct any potential errors or wrong question keys. Direct downloads are temporarily paused.
            </p>
            <div style="width: 100%; background: var(--surface-container); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.75rem 0.95rem; font-size: 0.75rem; color: var(--on-surface-muted); text-align: left; display: flex; align-items: flex-start; gap: 0.5rem; margin-top: 0.35rem;">
              <span class="material-symbols-outlined" style="font-size: 18px; color: var(--primary); flex-shrink: 0; margin-top: 1px;">info</span>
              <span>Online exam paper previews and module syllabus remain accessible. Verified error-free PDFs will be uploaded shortly!</span>
            </div>
          </div>
          <div class="modal-footer" style="justify-content: center; padding: 0.85rem 1.25rem; background: var(--surface-container); border-top: 1px solid var(--border-subtle);">
            <button class="btn-tech primary modal-close-btn" type="button" style="min-width: 140px; justify-content: center;">
              Understood
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', () => modal.classList.remove('active'));
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }

    const descEl = modal.querySelector('#maint-item-text');
    if (descEl && itemName) {
      descEl.textContent = `The PDF document for "${itemName}" is currently being reviewed and corrected to fix any possible errors or wrong pages. Downloads will resume as soon as the verified file is uploaded.`;
    }

    modal.classList.add('active');
    this.showToast('⚠️ Notice: PDF files are undergoing review & verification.', 'warning');
  }

  // Local Storage Management with Validation
  loadBookmarks() {
    try {
      const stored = localStorage.getItem('ktu_portal_bookmarks');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(b => b && typeof b === 'object' && typeof b.id === 'string');
    } catch (e) {
      console.warn('LocalStorage error:', e);
      return [];
    }
  }

  saveBookmarks() {
    try {
      localStorage.setItem('ktu_portal_bookmarks', JSON.stringify(this.state.savedBookmarks));
      this.updateBookmarkBadge();
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  isBookmarked(id) {
    return this.state.savedBookmarks.some(b => b.id === id);
  }

  toggleBookmark(item) {
    if (this.isBookmarked(item.id)) {
      this.state.savedBookmarks = this.state.savedBookmarks.filter(b => b.id !== item.id);
      this.showToast(`Removed from saved items`, 'info');
    } else {
      this.state.savedBookmarks.push(item);
      this.showToast(`Saved "${item.title || item.code}" to bookmarks`, 'success');
    }
    this.saveBookmarks();
    this.renderPortal();
  }

  updateBookmarkBadge() {
    const badge = document.getElementById('saved-badge-count');
    if (badge) {
      const count = this.state.savedBookmarks.length;
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }

  initElements() {
    // Selector containers
    this.schemeGroup = document.getElementById('scheme-group');
    this.branchGroup = document.getElementById('branch-group');
    this.yearGroup = document.getElementById('year-group');
    this.semDial = document.getElementById('semester-dial');

    // Portal containers
    this.subjectsContainer = document.getElementById('subjects-container');
    this.contextScheme = document.getElementById('context-scheme');
    this.contextBranch = document.getElementById('context-branch');
    this.contextSem = document.getElementById('context-sem');
    this.contextCount = document.getElementById('context-count');

    // Modals
    this.paperModal = document.getElementById('paper-modal');
    this.searchModal = document.getElementById('search-modal');
    this.gpaModal = document.getElementById('gpa-modal');
    this.requestModal = document.getElementById('request-modal');
    this.toastContainer = document.getElementById('toast-container');
  }

  bindEvents() {
    // Light / Dark Theme Toggle
    document.querySelectorAll('.theme-toggle-btn, #theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const isLight = document.documentElement.classList.contains('light');
        const next = isLight ? 'dark' : 'light';
        document.documentElement.classList.toggle('light', next === 'light');
        document.documentElement.classList.toggle('dark', next === 'dark');
        localStorage.setItem('ktu_theme', next);
      });
    });

    // Global Keyboard Shortcuts (Ctrl+K / Cmd+K & Escape)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.openSearchModal();
      }
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });

    // Search Trigger Button
    document.querySelectorAll('.search-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => this.openSearchModal());
    });

    // View Tabs (PYQs, Notes, Syllabus, Saved)
    document.querySelectorAll('.view-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.view-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.viewTab = btn.dataset.tab;
        this.renderPortal();
      });
    });

    // Sub-Filter Pills (All, Regular, Supply, Solved, Model)
    document.querySelectorAll('.sub-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sub-filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.subFilter = btn.dataset.filter;
        this.renderPortal();
      });
    });

    // CTA Explore Scroll Button
    const ctaBtn = document.getElementById('cta-button');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        const portalSection = document.getElementById('portal-section');
        if (portalSection) {
          portalSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Modal Close buttons
    document.querySelectorAll('.modal-close-btn, .modal-overlay').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target === el || el.classList.contains('modal-close-btn')) {
          this.closeAllModals();
        }
      });
    });

    // Modal stop propagation on content click
    document.querySelectorAll('.modal-container').forEach(el => {
      el.addEventListener('click', (e) => e.stopPropagation());
    });

    // Global Download Button Interceptor (All download clicks show Under Maintenance)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.download-paper-btn, .download-note-btn, .download-syllabus-btn, [data-download], [title*="Download"], [title*="download"]');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        const itemName = btn.getAttribute('data-subj-name') || btn.getAttribute('data-paper-title') || btn.getAttribute('title') || 'Question Paper PDF';
        this.showMaintenanceModal(itemName);
      }
    });

    // Paper Zoom Controls
    const zoomInBtn = document.getElementById('paper-zoom-in');
    const zoomOutBtn = document.getElementById('paper-zoom-out');
    const zoomResetBtn = document.getElementById('paper-zoom-reset');
    const printPaperBtn = document.getElementById('paper-print-btn');

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => this.adjustZoom(10));
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => this.adjustZoom(-10));
    }
    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', () => {
        this.state.zoomLevel = 100;
        this.applyZoom();
      });
    }
    if (printPaperBtn) {
      printPaperBtn.addEventListener('click', () => window.print());
    }

    // Command palette search input live filtering
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearchInput(e.target.value);
      });
    }

    // GPA Calculator Trigger
    document.querySelectorAll('.open-gpa-calc-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openGpaModal();
      });
    });

    // Request Paper Trigger
    document.querySelectorAll('.open-request-paper-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openRequestModal();
      });
    });

    // Saved Items Tab Navigation link in Header
    const navSavedBtn = document.getElementById('nav-saved-btn');
    if (navSavedBtn) {
      navSavedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.view-tab-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.tab === 'saved');
        });
        this.state.viewTab = 'saved';
        const portalSection = document.getElementById('portal-section');
        if (portalSection) portalSection.scrollIntoView({ behavior: 'smooth' });
        this.renderPortal();
      });
    }

    // In-page search input on papers.html
    const inpageSearchInput = document.getElementById('inpage-search-input');
    if (inpageSearchInput) {
      inpageSearchInput.addEventListener('input', (e) => {
        this.state.inpageSearch = e.target.value.trim().toLowerCase();
        this.renderPortal();
      });
    }

    // Quick Scheme Dropdown
    const quickScheme = document.getElementById('quick-scheme-select');
    if (quickScheme) {
      quickScheme.value = this.state.scheme;
      quickScheme.addEventListener('change', (e) => {
        this.state.scheme = e.target.value;
        if (this.state.scheme === '2019' && this.state.branch === 'AD') {
          this.state.branch = 'CS';
        }
        this.updateUrlParams();
        this.renderSelectorControls();
        this.renderPortal();
      });
    }

    // Quick Branch Dropdown
    const quickBranch = document.getElementById('quick-branch-select');
    if (quickBranch) {
      quickBranch.value = this.state.branch;
      quickBranch.addEventListener('change', (e) => {
        this.state.branch = e.target.value;
        this.updateUrlParams();
        this.renderSelectorControls();
        this.renderPortal();
      });
    }

    // Quick Sem Dropdown
    const quickSem = document.getElementById('quick-sem-select');
    if (quickSem) {
      quickSem.value = this.state.sem;
      quickSem.addEventListener('change', (e) => {
        this.state.sem = e.target.value;
        const sNum = parseInt(this.state.sem.replace('S', ''), 10);
        this.state.year = Math.ceil(sNum / 2);
        this.updateUrlParams();
        this.renderSelectorControls();
        this.renderPortal();
      });
    }

    // Request Form Submit
    const requestForm = document.getElementById('paper-request-form');
    if (requestForm) {
      requestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.showToast('Paper request submitted! Our student coordinators will index it shortly.', 'success');
        this.closeAllModals();
        requestForm.reset();
      });
    }
  }

  updateUrlParams() {
    if (window.history && window.history.replaceState) {
      const url = new URL(window.location);
      url.searchParams.set('scheme', this.state.scheme);
      url.searchParams.set('branch', this.state.branch);
      url.searchParams.set('sem', this.state.sem);
      if (this.state.viewTab !== 'pyqs') {
        url.searchParams.set('tab', this.state.viewTab);
      } else {
        url.searchParams.delete('tab');
      }
      window.history.replaceState({}, '', url);
    }
  }

  // Render Open Architectural Selectors
  renderSelectorControls() {
    // 1. Schemes Segmented Switcher (Box 1 & Box 2 Horizontally, No Overflow)
    if (this.schemeGroup) {
      this.schemeGroup.innerHTML = KTU_DATA.schemes.map(s => `
        <button class="scheme-segment-btn ${s.id === this.state.scheme ? 'active' : ''}" data-scheme="${s.id}" type="button">
          <div class="scheme-btn-top">
            <span class="name">${s.name}</span>
            ${s.id === this.state.scheme ? '<span class="material-symbols-outlined scheme-check-icon">check_circle</span>' : ''}
          </div>
          <span class="brand-badge ${s.badgeClass}">${s.tag}</span>
        </button>
      `).join('');

      this.schemeGroup.querySelectorAll('.scheme-segment-btn').forEach(card => {
        card.addEventListener('click', () => {
          this.state.scheme = card.dataset.scheme;
          if (this.state.scheme === '2019' && this.state.branch === 'AD') {
            this.state.branch = 'CS';
          }
          this.renderSelectorControls();
          this.renderPortal();
        });
      });
    }

    // 2. Branches Horizontal Box Cards (Filtered by active scheme)
    if (this.branchGroup) {
      const activeBranches = KTU_DATA.branches.filter(b => b.schemes.includes(this.state.scheme));
      if (!activeBranches.some(b => b.id === this.state.branch)) {
        this.state.branch = 'CS';
      }
      this.branchGroup.innerHTML = activeBranches.map(b => `
        <button class="branch-chip-btn ${b.id === this.state.branch ? 'active' : ''}" data-branch="${b.id}" type="button" title="${b.name}">
          <span class="material-symbols-outlined branch-icon">${b.icon}</span>
          <span class="branch-code-text">${b.code}</span>
        </button>
      `).join('');

      this.branchGroup.querySelectorAll('.branch-chip-btn').forEach(card => {
        card.addEventListener('click', () => {
          this.state.branch = card.dataset.branch;
          this.renderSelectorControls();
          this.renderPortal();
        });
      });
    }

    // 3. Unified Semester Matrix (S1 - S8) - Clean Bold Tiles
    if (this.semDial) {
      this.semDial.innerHTML = KTU_DATA.semesters.map(sem => `
        <button class="sem-segment-btn ${sem === this.state.sem ? 'active' : ''}" data-sem="${sem}" type="button">
          <span class="sem-num">${sem}</span>
        </button>
      `).join('');

      this.semDial.querySelectorAll('.sem-segment-btn').forEach(pill => {
        pill.addEventListener('click', () => {
          this.state.sem = pill.dataset.sem;
          const sNum = parseInt(this.state.sem.replace('S', ''), 10);
          this.state.year = Math.ceil(sNum / 2);
          this.renderSelectorControls();
          this.renderPortal();
        });
      });
    }

    // 4. Semesters Dial (Repo Page)
    const repoSemDial = document.getElementById('repo-sem-dial');
    if (repoSemDial) {
      repoSemDial.innerHTML = KTU_DATA.semesters.map(sem => `
        <button class="sem-pill ${sem === this.state.sem ? 'active' : ''}" data-sem="${sem}" type="button">
          ${sem}
        </button>
      `).join('');

      repoSemDial.querySelectorAll('.sem-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          this.state.sem = pill.dataset.sem;
          const sNum = parseInt(this.state.sem.replace('S', ''), 10);
          this.state.year = Math.ceil(sNum / 2);
          this.updateUrlParams();
          this.renderSelectorControls();
          this.renderPortal();
        });
      });
    }

    // Sync quick dropdown values on papers.html
    const qScheme = document.getElementById('quick-scheme-select');
    if (qScheme) qScheme.value = this.state.scheme;
    const qBranch = document.getElementById('quick-branch-select');
    if (qBranch) {
      const adOption = qBranch.querySelector('option[value="AD"]');
      if (adOption) {
        if (this.state.scheme === '2019') {
          adOption.style.display = 'none';
          adOption.disabled = true;
          if (this.state.branch === 'AD') {
            this.state.branch = 'CS';
          }
        } else {
          adOption.style.display = '';
          adOption.disabled = false;
        }
      }
      qBranch.value = this.state.branch;
    }
    const qSem = document.getElementById('quick-sem-select');
    if (qSem) qSem.value = this.state.sem;
  }

  // Google Drive Helpers
  getDriveFolderId(scheme, branch) {
    if (!KTU_DATA.driveLinks) return null;
    const s = KTU_DATA.driveLinks[scheme];
    return s && s[branch] ? s[branch] : null;
  }

  // embeddedfolderview opens directly inside mobile & desktop web browsers without triggering the Google Drive native app
  getDriveBrowserUrl(folderId) {
    return `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`;
  }

  getDriveAppUrl(folderId) {
    return `https://drive.google.com/drive/folders/${folderId}?usp=sharing`;
  }

  renderDriveBanner(folderId, branchObj) {
    if (!folderId) return '';
    const bName = branchObj ? branchObj.shortName : this.state.branch;
    const browserUrl = this.getDriveBrowserUrl(folderId);

    return `
      <div class="repo-drive-banner">
        <div class="drive-banner-left">
          <div class="drive-icon-badge">
            <span class="material-symbols-outlined">cloud_sync</span>
          </div>
          <div class="drive-banner-text">
            <div class="drive-banner-title">
              <span>Google Drive Question Papers Archive</span>
              <span class="drive-status-dot"></span>
              <span class="drive-status-label">Online</span>
            </div>
            <div class="drive-banner-sub">
              Access all <strong>${this.escapeHTML(bName)} (${this.escapeHTML(this.state.scheme)} Scheme)</strong> question papers &amp; valuation schemes in Google Drive.
            </div>
          </div>
        </div>
        <div class="drive-banner-actions">
          <a href="${browserUrl}" target="_blank" rel="noopener noreferrer" class="drive-btn-browser" title="Opens Drive repository inside your browser">
            <span class="material-symbols-outlined" style="font-size: 18px;">open_in_browser</span>
            <span>Open in Browser</span>
          </a>
        </div>
      </div>
    `;
  }

  // Filter subjects matching current scheme, branch, semester & inpage search
  getFilteredSubjects() {
    if (this.state.viewTab === 'saved') {
      return []; // Handled separately
    }

    return KTU_DATA.subjects.filter(subj => {
      const matchesScheme = subj.schemes.includes(this.state.scheme);
      const matchesBranch = subj.branch.includes(this.state.branch);
      const matchesSem = subj.sem === this.state.sem;
      
      let matchesSearch = true;
      if (this.state.inpageSearch) {
        matchesSearch = subj.code.toLowerCase().includes(this.state.inpageSearch) ||
                        subj.name.toLowerCase().includes(this.state.inpageSearch) ||
                        subj.modules.some(m => m.title.toLowerCase().includes(this.state.inpageSearch) || m.topics.toLowerCase().includes(this.state.inpageSearch));
      }

      return matchesScheme && matchesBranch && matchesSem && matchesSearch;
    });
  }

  // Render Portal Main Content
  renderPortal() {
    const branchObj = KTU_DATA.branches.find(b => b.id === this.state.branch);
    
    // Update Context Badges
    if (this.contextScheme) this.contextScheme.textContent = `${this.state.scheme} Scheme`;
    if (this.contextBranch) this.contextBranch.textContent = branchObj ? branchObj.name : this.state.branch;
    if (this.contextSem) this.contextSem.textContent = `Semester ${this.state.sem}`;

    // Update Breadcrumbs
    const bScheme = document.getElementById('breadcrumb-scheme');
    if (bScheme) bScheme.textContent = `${this.state.scheme} Scheme`;
    const bBranch = document.getElementById('breadcrumb-branch');
    if (bBranch) bBranch.textContent = branchObj ? branchObj.shortName : this.state.branch;
    const bSem = document.getElementById('breadcrumb-sem');
    if (bSem) bSem.textContent = `Semester ${this.state.sem}`;

    // Sub-filters visibility
    const subFilterBar = document.getElementById('sub-filters-bar');
    if (subFilterBar) {
      subFilterBar.style.display = (this.state.viewTab === 'pyqs') ? 'flex' : 'none';
    }

    if (!this.subjectsContainer) return;

    // Handle Saved Tab View
    if (this.state.viewTab === 'saved') {
      this.renderSavedView();
      return;
    }

    const subjects = this.getFilteredSubjects();
    if (this.contextCount) {
      this.contextCount.textContent = `${subjects.length} Subjects Listed`;
    }

    const folderId = this.getDriveFolderId(this.state.scheme, this.state.branch);
    const driveBannerHtml = this.renderDriveBanner(folderId, branchObj);

    if (subjects.length === 0) {
      this.subjectsContainer.innerHTML = `
        ${driveBannerHtml}
        <div style="text-align:center;padding:4rem 1rem;background-color:var(--surface-low);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);">
          <span class="material-symbols-outlined" style="font-size:48px;color:var(--on-surface-muted);margin-bottom:1rem;">folder_open</span>
          <h3 style="font-size:1.25rem;margin-bottom:0.5rem;">No Specific Subject Cards for this Filter</h3>
          <p style="color:var(--on-surface-variant);max-width:440px;margin:0 auto 1.5rem auto;font-size:0.875rem;">
            You can access all available question papers directly via the Google Drive repository above.
          </p>
          <button class="btn-tech primary open-request-paper-btn" type="button">
            <span class="material-symbols-outlined" style="font-size:16px;">upload_file</span>
            Submit / Request Papers for this Semester
          </button>
        </div>
      `;
      // Re-bind request button
      this.subjectsContainer.querySelectorAll('.open-request-paper-btn').forEach(btn => {
        btn.addEventListener('click', () => this.openRequestModal());
      });
      return;
    }

    this.subjectsContainer.innerHTML = driveBannerHtml + subjects.map(subj => {
      return `
        <div class="subject-card" id="subj-${subj.id}">
          <div class="subject-header">
            <div class="subject-title-block">
              <span class="subject-code-tag">${subj.code}</span>
              <h2 class="subject-name">${subj.name}</h2>
            </div>
          </div>
          <div class="resources-container">
            ${this.renderSubjectResourceContent(subj)}
          </div>
        </div>
      `;
    }).join('');

    // Bind Subject Cards Actions
    this.bindSubjectActions();
  }

  renderSubjectResourceContent(subj) {
    const pyqs = subj.pyqs || [];
    if (pyqs.length === 0) {
      return `<p style="font-size:0.875rem;color:var(--on-surface-muted);padding:1rem 0;">No question papers available for this subject.</p>`;
    }

    return `
      <div class="pyq-matrix-grid">
        ${pyqs.map(pyq => {
          return `
            <div class="pyq-item-card">
              <div class="pyq-header-row">
                <span class="pyq-session-badge">${pyq.session} ${pyq.year}</span>
              </div>
              <div class="pyq-actions-row">
                <button class="btn-tech primary download-paper-btn" data-subj-name="${subj.name}" data-paper-year="${pyq.year}" title="Download PDF">
                  <span class="material-symbols-outlined" style="font-size:16px;">download</span>
                  Download PDF
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  renderSavedView() {
    if (this.contextCount) {
      this.contextCount.textContent = `${this.state.savedBookmarks.length} Items Saved`;
    }

    if (this.state.savedBookmarks.length === 0) {
      this.subjectsContainer.innerHTML = `
        <div style="text-align:center;padding:4rem 1rem;background-color:var(--surface-low);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);">
          <span class="material-symbols-outlined" style="font-size:48px;color:var(--secondary-amber);margin-bottom:1rem;">bookmark_border</span>
          <h3 style="font-size:1.25rem;margin-bottom:0.5rem;">No Saved Question Papers</h3>
          <p style="color:var(--on-surface-variant);max-width:440px;margin:0 auto 1.5rem auto;font-size:0.875rem;">
            Click the bookmark icon on any KTU question paper or subject to save it here for instant offline access.
          </p>
          <button class="btn-tech primary" id="back-to-browse-btn" type="button">
            <span class="material-symbols-outlined" style="font-size:16px;">explore</span>
            Browse Question Papers
          </button>
        </div>
      `;
      const backBtn = document.getElementById('back-to-browse-btn');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          document.querySelectorAll('.view-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === 'pyqs');
          });
          this.state.viewTab = 'pyqs';
          this.renderPortal();
        });
      }
      return;
    }

    this.subjectsContainer.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:0.75rem;border-bottom:1px solid var(--border-subtle);">
          <h3 style="font-size:1.125rem;">Saved Library & Offline Bookmarks</h3>
          <button class="btn-tech" id="clear-all-saved-btn">
            <span class="material-symbols-outlined" style="font-size:15px;">delete_sweep</span>
            Clear All
          </button>
        </div>
        <div class="pyq-matrix-grid">
          ${this.state.savedBookmarks.map(item => `
            <div class="pyq-item-card solved-paper">
              <div class="pyq-header-row">
                <span class="pyq-session-badge">${this.escapeHTML(item.title || item.code)}</span>
                <span class="brand-badge bg-primary/10 text-primary">Saved</span>
              </div>
              <p style="font-size:0.8125rem;color:var(--on-surface-variant);">${this.escapeHTML(item.desc || 'KTU Resource')}</p>
              <div class="pyq-actions-row">
                <button class="btn-tech primary preview-paper-btn" data-subj-code="${this.escapeHTML(item.code || 'CST 201')}" data-subj-name="${this.escapeHTML(item.title || 'Data Structures')}" data-paper-year="2024" data-paper-session="Regular">
                  <span class="material-symbols-outlined" style="font-size:15px;">visibility</span>
                  Open
                </button>
                <button class="btn-icon-square bookmarked" title="Remove Bookmark" data-remove-saved="${this.escapeHTML(item.id)}">
                  <span class="material-symbols-outlined fill">bookmark</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Clear all saved
    const clearBtn = document.getElementById('clear-all-saved-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all saved bookmarks?')) {
          this.state.savedBookmarks = [];
          this.saveBookmarks();
          this.renderPortal();
          this.showToast('All saved items cleared', 'info');
        }
      });
    }

    // Remove single saved
    this.subjectsContainer.querySelectorAll('[data-remove-saved]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.removeSaved;
        this.toggleBookmark({ id });
      });
    });

    this.bindSubjectActions();
  }

  bindSubjectActions() {
    // Preview Paper Modal
    this.subjectsContainer.querySelectorAll('.preview-paper-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const { subjCode, subjName, paperYear, paperSession } = btn.dataset;
        this.openPaperModal({
          code: subjCode,
          name: subjName,
          year: paperYear,
          session: paperSession
        });
      });
    });

    // Preview Note button
    this.subjectsContainer.querySelectorAll('.preview-note-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.title;
        this.openPaperModal({
          code: 'KTU PAPERS',
          name: title,
          year: '2024-25',
          session: 'Verified Study Material'
        });
      });
    });

    // Download buttons -> Open in Browser Google Drive if available, else maintenance trigger
    this.subjectsContainer.querySelectorAll('.download-paper-btn, .download-note-btn, .download-syllabus-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const folderId = this.getDriveFolderId(this.state.scheme, this.state.branch);
        if (folderId) {
          // Open in Browser View (embeddedfolderview ensures browser opens instead of Google Drive mobile app)
          window.open(this.getDriveBrowserUrl(folderId), '_blank', 'noopener,noreferrer');
        } else {
          const itemName = btn.getAttribute('data-subj-name') || 'Question Paper PDF';
          this.showMaintenanceModal(itemName);
        }
      });
    });

    // Save subject bookmark
    this.subjectsContainer.querySelectorAll('[data-save-subj]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.saveSubj;
        const subj = KTU_DATA.subjects.find(s => s.id === id);
        if (subj) {
          this.toggleBookmark({
            id: subj.id,
            code: subj.code,
            title: subj.name,
            desc: `${subj.sem} • ${subj.credits} Credits • ${subj.category}`
          });
        }
      });
    });

    // Save paper bookmark
    this.subjectsContainer.querySelectorAll('[data-save-paper]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.savePaper;
        const title = btn.dataset.paperTitle;
        this.toggleBookmark({
          id,
          title,
          desc: `Question Paper Archive • ${this.state.scheme} Scheme`
        });
      });
    });
  }

  // Open Paper Viewer Modal
  openPaperModal(info) {
    if (!this.paperModal) return;

    // Load authentic paper layout
    const paperCanvas = document.getElementById('paper-viewer-canvas');
    const paperTitleDisplay = document.getElementById('modal-paper-title');

    if (paperTitleDisplay) {
      paperTitleDisplay.textContent = `${info.code} — ${info.name} (${info.year})`;
    }

    // Lookup sample paper data or construct dynamic authentic KTU exam sheet
    const sample = KTU_DATA.samplePapers['cst201-2024-reg'];

    if (paperCanvas) {
      paperCanvas.innerHTML = `
        <div class="paper-univ-header">
          <h2>${sample.title}</h2>
          <div class="paper-exam-title">${this.escapeHTML(info.year ? info.year : '2024')} B.TECH DEGREE EXAMINATION</div>
          <div class="paper-course-title">Course Code: ${this.escapeHTML(info.code || 'CST 201')} — Course Name: ${this.escapeHTML(info.name || 'DATA STRUCTURES')}</div>
          <div style="font-size:0.875rem;margin-top:4px;">(Common to CSE, AI & Data Science)</div>
        </div>

        <div class="paper-specs-table">
          <span>Max. Marks: 100</span>
          <span>Scheme: ${this.escapeHTML(this.state.scheme)} Scheme</span>
          <span>Duration: 3 Hours</span>
        </div>

        <!-- PART A -->
        <div class="paper-part-header">PART A</div>
        <div class="paper-instruction">${sample.parts[0].instruction}</div>

        <div>
          ${sample.parts[0].questions.map(q => `
            <div class="paper-question-row">
              <span class="paper-qno">${q.qNo}.</span>
              <span class="paper-qtext">${q.text}</span>
              <span class="paper-qmarks">(${q.marks})</span>
            </div>
          `).join('')}
        </div>

        <!-- PART B -->
        <div class="paper-part-header">PART B</div>
        <div class="paper-instruction">${sample.parts[1].instruction}</div>

        <div>
          ${sample.parts[1].modules.map(m => `
            <div style="font-weight:bold;text-align:center;margin:1rem 0 0.5rem 0;font-size:0.9375rem;color:#1e3a8a;">
              — ${m.module} —
            </div>
            ${m.questions.map(q => `
              <div class="paper-question-row">
                <span class="paper-qno">${q.qNo}</span>
                <span class="paper-qtext">${q.text}</span>
                <span class="paper-qmarks">(${q.marks})</span>
              </div>
            `).join('')}
          `).join('')}
        </div>

        <div style="text-align:center;margin-top:2.5rem;font-weight:bold;border-top:1px solid #d1d5db;padding-top:1rem;">
          *** END OF QUESTION PAPER ***
        </div>
      `;
    }

    this.state.zoomLevel = 100;
    this.applyZoom();
    this.paperModal.classList.add('active');
  }

  adjustZoom(delta) {
    this.state.zoomLevel = Math.max(50, Math.min(180, this.state.zoomLevel + delta));
    this.applyZoom();
  }

  applyZoom() {
    const canvas = document.getElementById('paper-viewer-canvas');
    const zoomText = document.getElementById('paper-zoom-val');
    if (canvas) {
      canvas.style.transform = `scale(${this.state.zoomLevel / 100})`;
      canvas.style.transformOrigin = 'top center';
    }
    if (zoomText) {
      zoomText.textContent = `${this.state.zoomLevel}%`;
    }
  }

  // Global Search Modal (Ctrl+K)
  openSearchModal() {
    if (!this.searchModal) return;
    this.searchModal.classList.add('active');
    const input = document.getElementById('global-search-input');
    if (input) {
      input.value = '';
      input.focus();
      this.handleSearchInput('');
    }
  }

  handleSearchInput(query) {
    const q = query.trim().toLowerCase();
    const resultsContainer = document.getElementById('search-results-list');
    if (!resultsContainer) return;

    if (!q) {
      resultsContainer.innerHTML = `
        <div style="padding:1.5rem;text-align:center;color:var(--on-surface-muted);font-size:0.875rem;">
          Type course code (e.g. <span class="font-mono text-primary">CST 201</span>, <span class="font-mono text-primary">MAT 101</span>) or subject name...
        </div>
      `;
      return;
    }

    const matches = KTU_DATA.subjects.filter(s => {
      return s.code.toLowerCase().includes(q) ||
             s.name.toLowerCase().includes(q) ||
             s.sem.toLowerCase().includes(q) ||
             s.modules.some(m => m.title.toLowerCase().includes(q) || m.topics.toLowerCase().includes(q));
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding:2rem;text-align:center;color:var(--on-surface-muted);">
          No KTU course records matching "<strong>${this.escapeHTML(query)}</strong>".
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matches.map(s => `
      <div class="search-result-item" data-jump-code="${s.code}" data-jump-sem="${s.sem}" data-jump-branch="${s.branch[0]}">
        <div>
          <div class="search-result-title">${s.name}</div>
          <div class="search-result-sub">
            <span class="font-mono text-primary">${s.code}</span> • ${s.sem} • ${s.credits} Credits • ${s.category}
          </div>
        </div>
        <span class="material-symbols-outlined" style="color:var(--on-surface-muted);font-size:18px;">arrow_forward</span>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const { jumpSem, jumpBranch } = item.dataset;
        this.state.sem = jumpSem;
        this.state.branch = jumpBranch;
        const sNum = parseInt(jumpSem.replace('S', ''), 10);
        this.state.year = Math.ceil(sNum / 2);
        this.closeAllModals();
        this.renderSelectorControls();
        this.renderPortal();
        const portalSection = document.getElementById('portal-section');
        if (portalSection) portalSection.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // GPA Calculator Modal
  openGpaModal() {
    if (!this.gpaModal) return;
    this.gpaModal.classList.add('active');
    this.renderGpaRows();
  }

  renderGpaRows() {
    const list = document.getElementById('gpa-courses-list');
    if (!list) return;

    const defaultCourses = [
      { name: 'Course 1 (Core)', credits: 4, grade: 'S' },
      { name: 'Course 2 (Core)', credits: 4, grade: 'A+' },
      { name: 'Course 3 (Core)', credits: 4, grade: 'A' },
      { name: 'Course 4 (Theory)', credits: 3, grade: 'B+' },
      { name: 'Course 5 (Math/Science)', credits: 4, grade: 'B+' },
      { name: 'Lab Practical 1', credits: 2, grade: 'S' },
      { name: 'Lab Practical 2', credits: 2, grade: 'A+' }
    ];

    list.innerHTML = defaultCourses.map((c, i) => `
      <div class="gpa-course-row">
        <input type="text" class="gpa-input" value="${c.name}" placeholder="Course Name" />
        <select class="gpa-select gpa-credit-select">
          <option value="4" ${c.credits === 4 ? 'selected' : ''}>4 Credits</option>
          <option value="3" ${c.credits === 3 ? 'selected' : ''}>3 Credits</option>
          <option value="2" ${c.credits === 2 ? 'selected' : ''}>2 Credits</option>
          <option value="1" ${c.credits === 1 ? 'selected' : ''}>1 Credit</option>
        </select>
        <select class="gpa-select gpa-grade-select">
          <option value="10" ${c.grade === 'S' ? 'selected' : ''}>S (10)</option>
          <option value="9" ${c.grade === 'A+' ? 'selected' : ''}>A+ (9.0)</option>
          <option value="8.5" ${c.grade === 'A' ? 'selected' : ''}>A (8.5)</option>
          <option value="8" ${c.grade === 'B+' ? 'selected' : ''}>B+ (8.0)</option>
          <option value="7" ${c.grade === 'B' ? 'selected' : ''}>B (7.0)</option>
          <option value="6" ${c.grade === 'C' ? 'selected' : ''}>C (6.0)</option>
          <option value="5" ${c.grade === 'P' ? 'selected' : ''}>P (5.0)</option>
          <option value="0" ${c.grade === 'F' ? 'selected' : ''}>F (0)</option>
        </select>
        <button class="btn-icon-square gpa-delete-row" title="Remove row" type="button">
          <span class="material-symbols-outlined" style="font-size:16px;">close</span>
        </button>
      </div>
    `).join('');

    // Bind change events
    list.querySelectorAll('.gpa-credit-select, .gpa-grade-select').forEach(sel => {
      sel.addEventListener('change', () => this.calculateGPA());
    });

    list.querySelectorAll('.gpa-delete-row').forEach(btn => {
      btn.addEventListener('click', (e) => {
        btn.closest('.gpa-course-row').remove();
        this.calculateGPA();
      });
    });

    const addRowBtn = document.getElementById('gpa-add-row-btn');
    if (addRowBtn) {
      addRowBtn.onclick = () => {
        const div = document.createElement('div');
        div.className = 'gpa-course-row';
        div.innerHTML = `
          <input type="text" class="gpa-input" value="Elective / Lab Course" placeholder="Course Name" />
          <select class="gpa-select gpa-credit-select">
            <option value="4">4 Credits</option>
            <option value="3" selected>3 Credits</option>
            <option value="2">2 Credits</option>
            <option value="1">1 Credit</option>
          </select>
          <select class="gpa-select gpa-grade-select">
            <option value="10">S (10)</option>
            <option value="9">A+ (9.0)</option>
            <option value="8.5" selected>A (8.5)</option>
            <option value="8">B+ (8.0)</option>
            <option value="7">B (7.0)</option>
            <option value="6">C (6.0)</option>
            <option value="5">P (5.0)</option>
            <option value="0">F (0)</option>
          </select>
          <button class="btn-icon-square gpa-delete-row" title="Remove row" type="button">
            <span class="material-symbols-outlined" style="font-size:16px;">close</span>
          </button>
        `;
        list.appendChild(div);
        div.querySelectorAll('.gpa-credit-select, .gpa-grade-select').forEach(sel => {
          sel.addEventListener('change', () => this.calculateGPA());
        });
        div.querySelector('.gpa-delete-row').addEventListener('click', () => {
          div.remove();
          this.calculateGPA();
        });
        this.calculateGPA();
      };
    }

    this.calculateGPA();
  }

  calculateGPA() {
    const list = document.getElementById('gpa-courses-list');
    if (!list) return;

    let totalCredits = 0;
    let totalGradePoints = 0;

    list.querySelectorAll('.gpa-course-row').forEach(row => {
      const credit = parseFloat(row.querySelector('.gpa-credit-select').value);
      const grade = parseFloat(row.querySelector('.gpa-grade-select').value);
      totalCredits += credit;
      totalGradePoints += (credit * grade);
    });

    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
    const scoreDisplay = document.getElementById('gpa-calculated-score');
    const totalCreditsDisplay = document.getElementById('gpa-total-credits');

    if (scoreDisplay) scoreDisplay.textContent = gpa;
    if (totalCreditsDisplay) totalCreditsDisplay.textContent = `Total Credits: ${totalCredits} | SGPA Formula: Σ(Ci × Gi) / ΣCi`;
  }

  // Request Paper Modal
  openRequestModal() {
    if (this.requestModal) {
      this.requestModal.classList.add('active');
    } else {
      this.showToast('Paper request queue is active. Please check back as new papers are uploaded.', 'info');
    }
  }

  closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.remove('active');
    });
  }

  // Toast System with Safe DOM Rendering (XSS Immune)
  showToast(message, type = 'info') {
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'info';
    let iconColor = 'var(--primary)';
    if (type === 'success') {
      icon = 'check_circle';
      iconColor = 'var(--tertiary-teal)';
    } else if (type === 'warning') {
      icon = 'warning';
      iconColor = '#f59e0b';
    } else if (type === 'error') {
      icon = 'error';
      iconColor = '#ef4444';
    }

    const iconSpan = document.createElement('span');
    iconSpan.className = 'material-symbols-outlined';
    iconSpan.style.fontSize = '18px';
    iconSpan.style.color = iconColor;
    iconSpan.textContent = icon;

    const textSpan = document.createElement('span');
    textSpan.textContent = String(message);

    toast.appendChild(iconSpan);
    toast.appendChild(textSpan);

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Instantiate on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.ktuApp = new KTUPortalApp();
});
