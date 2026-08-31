(function(){

  const SECTIONS = [
    { id:'bio',      title:'Bio',      sub:'about.me',   lat:  20, lon:-155 },
    { id:'skills',   title:'Skills',   sub:'stack.json', lat: -15, lon: -83 },
    { id:'projects', title:'Projects', sub:'work/',      lat:  30, lon: -11 },
    { id:'tools',    title:'Tools',    sub:'utils/',     lat: -25, lon:  61 },
    { id:'contact',  title:'Contact',  sub:'reach.out',  lat:   5, lon: 133 },
  ];

  const WELCOME_LINE_1 = "Welcome to Demi's corner of the galaxy.";
  const WELCOME_LINE_2 = "Every beacon below leads somewhere real.";
  const WELCOME_FINAL  = "Happy exploring!";

  const SECTION_CONTENT = {
    bio: {
      eyebrow: 'Transmission 01 · Bio',
      html: `
        <div class="bio-header">
          <div class="avatar-frame">
            <img width="200" height="200" src="/assets/img/avatar.png" alt="Saviour Achoda, also known as Demi">
          </div>
          <h1>Hey, I'm Demi.</h1>
        </div>
        <p>The name behind the callsign is Saviour Achoda — a self-taught full-stack developer based in Nigeria. I build and maintain fast, scalable, and secure web and mobile systems, with a particular focus on fintech.</p>
        <p>Most of my missions orbit mobile wallets, trading platforms, resilient KYC flows, and operational dashboards — but my range extends well beyond fintech. If it runs on the web, I can take it from first signal to launch and keep it steady in orbit. I ship fast without cutting corners where reliability, security, or people's money is concerned.</p>
        <p>My core stack is Django and Django REST Framework, React, React Native with Expo, and the web fundamentals: HTML, CSS, and JavaScript. Rust is the newest system in my constellation, reserved for problems where speed, safety, and correctness need to align.</p>
      `
    },
    skills: {
      eyebrow: 'Transmission 02 · Skills',
      html: `
        <h1>The stack behind the signal.</h1>
        <p>A dependable flight deck for taking products from first commit to stable deployment.</p>
        <div class="grid">
          <div class="card">
            <h3>Core systems</h3>
            <div class="tag-row">
              <span class="tag">Python</span><span class="tag">Django</span><span class="tag">DRF</span><span class="tag">PostgreSQL</span><span class="tag">Next.js</span></div>
          </div>
          <div class="card">
            <h3>Interfaces</h3>
            <div class="tag-row"><span class="tag">React</span><span class="tag">React Native</span><span class="tag">Expo</span><span class="tag">JavaScript</span><span class="tag">HTML &amp; CSS</span></div>
          </div>
          <div class="card">
            <h3>Expanding orbit</h3>
            <div class="tag-row"><span class="tag">Rust</span></div>
          </div>
          <div class="card">
            <h3>Mission focus</h3>
            <div class="tag-row"><span class="tag">Fintech</span><span class="tag">Wallets</span><span class="tag">Trading systems</span><span class="tag">KYC flows</span></div>
          </div>
        </div>
      `
    },
    projects: {
      eyebrow: 'Transmission 03 · Projects',
      html: `
        <h1>Selected missions.</h1>
        <p>Some of the systems I've designed, shipped, or continue to evolve.</p>
        <div class="grid">
          <a class="card tool-card" href="https://github.com/demigodhitr/lumisx" target="_blank" rel="noopener">
            <h3>Lumis X</h3>
            <p>A full-stack brokerage and investment simulation with wallet flows, asset tracking, crypto-to-fiat handling, and dynamic admin control.</p>
            <span class="tool-status">Public repository ↗</span>
          </a>
          <div class="card">
            <h3>WhoISNigeria</h3>
            <p>A platform that builds immutable reputation records for online vendors and service providers. Registered or not, every vendor can receive customer feedback and ratings that contribute to a lasting public reputation.</p>
            <span class="tool-status">In development</span>
          </div>
          <div class="card">
            <h3>Bitcoin Timelock Vault</h3>
            <p>A three-script Python proof of concept using CLTV to enforce time-locked, on-chain spending conditions.</p>
            <span class="tool-status">Private project</span>
          </div>
          <div class="card">
            <h3>Synthetic backend SDK</h3>
            <p>A Python toolkit for spinning up realistic mock backend ecosystems for demos, integration tests, and frontend development.</p>
          </div>
          <div class="card">
            <h3>Universal Media Downloader</h3>
            <p>A Django and React utility for retrieving supported media without user accounts or persistent personal data.</p>
          </div>
        </div>
      `
    },
    tools: {
      eyebrow: 'Transmission 04 · Tools',
      html: `
        <h1>Tiny tools, zero friction.</h1>
        <p>Small, free utilities — no sign-up, nothing tracked, works only in-browser except for the Social Media Downloader.</p>
        <div class="grid">
          <div class="card" id="downloader-tool-link">
            <h3>Social Media Downloader</h3>
            <p>yt-dlp powered — Facebook, Instagram, TikTok (no watermark), X(twitter), YouTube, and more.</p>
            <span class="tool-status">In development</span>
          </div>
          <a class="card tool-card" href="/html/utils/color-palette.html"><h3>Color Palette Generator</h3><p>Turn one seed color into a harmonious, copy-ready interface palette.</p><span class="tool-status">Open tool ↗</span></a>
          <a class="card tool-card" href="/html/utils/password-generator.html"><h3>Password Generator</h3><p>Generate strong passwords with secure, in-browser randomness.</p><span class="tool-status">Open tool ↗</span></a>
          <a class="card tool-card" href="/html/utils/jwt-decoder.html"><h3>JWT Decoder</h3><p>Decode a token's header and payload, right in the browser.</p></a>
          <a class="card tool-card" href="/html/utils/jwt-encoder.html"><h3>JWT Encoder</h3><p>Build and sign a token (HS256/384/512), no backend required.</p></a>
        </div>
      `
    },
    contact: {
      eyebrow: 'Transmission 05 · Contact',
      html: `
        <h1>Open a channel.</h1>
        <p>Find my expertise worthy of employment? Have a product idea awaiting build or deployment, a fintech system to strengthen, or a strange technical problem in your orbit? Send a signal.</p>
        <div class="contact-row">
          <a href="mailto:achodasaviour4@gmail.com"><span>Email</span><span class="k">achodasaviour4@gmail.com</span></a>
          <a href="tel:+2348061991511"><span>Phone</span><span class="k">0806 199 1511</span></a>
          <a href="https://wa.me/2348061991511" target="_blank" rel="noopener"><span>WhatsApp</span><span class="k">0806 199 1511</span></a>
          <a href="https://github.com/demigodHITR" target="_blank" rel="noopener"><span>GitHub</span><span class="k">@demigodHITR</span></a>
          <a href="https://x.com/demigodHITR" target="_blank" rel="noopener"><span>X / Twitter</span><span class="k">@demigodHITR</span></a>
        </div>
      `
    }
  };

  const R = 2;                 // globe radius
  const ZOOM_DIST = 3.3;       // camera distance when a section is open
  const IDLE_ROTATE_SPEED = 0.50; // rad/sec — idle auto-spin
  const IDLE_DELAY = 1500;     // ms of no input before auto-rotate resumes
  const DRAG_SENS = 0.0052;
  const TILT_MIN = Math.PI/2 - 0.35, TILT_MAX = Math.PI/2 + 0.35;
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function clamp(v,a,b){ return Math.max(a, Math.min(b,v)); }
  function vw(){ return window.innerWidth; }
  function vh(){ return window.innerHeight; }

  /* ========================
     3. THREE SETUP
     ======================== */
  const container = document.getElementById('scene-container');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05070d);

  const camera = new THREE.PerspectiveCamera(45, vw()/vh(), 0.1, 100);


  function computeOrbitDist(){
    const aspect = vw() / vh();
    const halfV = Math.tan((camera.fov * Math.PI/180) / 2);
    return aspect >= 1
      ? (R * 1.33) / halfV
      : (R * 1.08) / (halfV * aspect);
  }
  let orbitDist = computeOrbitDist();
  let MIN_DIST = orbitDist*0.72, MAX_DIST = orbitDist*1.44;
  let camDist = orbitDist;

  const renderer = new THREE.WebGLRenderer({ antialias:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(vw(), vh());
  container.appendChild(renderer.domElement);

  // Starfield
  (function addStars(){
    const count = 1400;
    const positions = new Float32Array(count*3);
    for(let i=0;i<count;i++){
      const r = 30 + Math.random()*40;
      const theta = Math.random()*Math.PI*2;
      const phi = Math.acos((Math.random()*2)-1);
      positions[i*3]   = r*Math.sin(phi)*Math.cos(theta);
      positions[i*3+1] = r*Math.cos(phi);
      positions[i*3+2] = r*Math.sin(phi)*Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
    const mat = new THREE.PointsMaterial({ color:0xaeb8e0, size:0.06, sizeAttenuation:true, transparent:true, opacity:0.8 });
    scene.add(new THREE.Points(geo, mat));
  })();

  // Soft halo behind the globe
  (function addGlow(){
    const c = document.createElement('canvas');
    c.width = c.height = 512;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(256,256,0,256,256,256);
    g.addColorStop(0, 'rgba(90,130,255,0.35)');
    g.addColorStop(0.5, 'rgba(60,90,200,0.12)');
    g.addColorStop(1, 'rgba(60,90,200,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,512,512);
    const tex = new THREE.CanvasTexture(c);
    const mat = new THREE.SpriteMaterial({ map:tex, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(R*3.4, R*3.4, 1);
    scene.add(sprite);
  })();

  // Lights
  scene.add(new THREE.AmbientLight(0x4a5a9a, 0.55));
  const sun = new THREE.DirectionalLight(0xffffff, 1.15);
  sun.position.set(4, 2, 5);
  scene.add(sun);

  /* =========================================================
     4. GLOBE SURFACE — rough continent outlines 
     ========================================================= */
  const CONTINENTS = [
    [[37,-6],[35,10],[31,25],[22,35],[12,43],[2,45],[-10,40],[-22,35],[-30,30],[-34,20],[-33,18],[-28,16],[-18,12],[-8,10],[0,9],[5,-2],[4,-8],[10,-13],[15,-17],[21,-17],[28,-11],[32,-9],[35,-6]],
    [[70,-160],[66,-140],[60,-140],[55,-130],[48,-125],[40,-124],[32,-117],[25,-110],[20,-105],[16,-95],[19,-88],[21,-87],[25,-80],[30,-81],[35,-76],[40,-74],[45,-67],[47,-60],[52,-56],[58,-62],[63,-68],[68,-85],[70,-100],[72,-125]],
    [[12,-72],[5,-77],[-2,-80],[-10,-78],[-18,-70],[-24,-70],[-33,-72],[-40,-73],[-45,-73],[-52,-70],[-55,-68],[-52,-65],[-45,-65],[-38,-58],[-30,-52],[-23,-45],[-15,-39],[-8,-35],[-2,-44],[2,-50],[5,-53],[8,-60],[10,-65]],
    [[71,25],[65,25],[60,30],[55,38],[48,40],[45,36],[40,28],[37,23],[38,15],[41,13],[44,8],[43,3],[40,-3],[43,-9],[48,-5],[52,4],[55,8],[58,10],[60,5],[65,12],[70,20]],
    [[70,60],[68,90],[65,140],[60,160],[50,140],[45,135],[35,130],[25,122],[15,105],[8,100],[1,104],[-8,115],[5,95],[8,80],[15,75],[20,70],[25,65],[30,55],[35,45],[40,35],[45,35],[50,40],[55,45],[60,50],[65,55]],
    [[-11,131],[-14,144],[-19,146],[-24,153],[-31,153],[-35,150],[-38,147],[-38,141],[-35,136],[-33,131],[-25,113],[-20,115],[-14,127]],
  ];

  function mulberry32(seed){
    return function(){
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function toCanvasXY(lat, lon, w, h){
    return [ (lon+180)/360*w, (90-lat)/180*h ];
  }

  function smoothClosedPath(ctx, pts){
    const mid = (a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
    ctx.beginPath();
    const m0 = mid(pts[0], pts[pts.length-1]);
    ctx.moveTo(m0[0], m0[1]);
    for(let i=0;i<pts.length;i++){
      const cur = pts[i], next = pts[(i+1)%pts.length];
      const m = mid(cur, next);
      ctx.quadraticCurveTo(cur[0], cur[1], m[0], m[1]);
    }
    ctx.closePath();
  }

  function buildGlobeTexture(){
    const w=1024, h=512;
    const c = document.createElement('canvas');
    c.width=w; c.height=h;
    const ctx = c.getContext('2d');

    // ocean base
    ctx.fillStyle = '#0a1330';
    ctx.fillRect(0,0,w,h);


    const oceanRnd = mulberry32(7);
    for(let i=0;i<6;i++){
      const x = oceanRnd()*w, y = h*0.2+oceanRnd()*h*0.6;
      const rad = 60+oceanRnd()*120;
      const g = ctx.createRadialGradient(x,y,0,x,y,rad);
      g.addColorStop(0, 'rgba(40,60,130,0.35)');
      g.addColorStop(1, 'rgba(40,60,130,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x,y,rad,0,Math.PI*2); ctx.fill();
    }

    // graticule 
    ctx.strokeStyle = 'rgba(150,175,230,0.12)';
    ctx.lineWidth = 1;
    for(let lon=0; lon<=360; lon+=30){
      const x = (lon/360)*w;
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke();
    }
    for(let lat=-60; lat<=60; lat+=30){
      const y = h/2 - (lat/90)*(h/2);
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(150,175,230,0.28)';
    ctx.beginPath(); ctx.moveTo(0,h/2); ctx.lineTo(w,h/2); ctx.stroke();

    // landmasses
    CONTINENTS.forEach((poly, idx)=>{
      const pts = poly.map(([lat,lon]) => toCanvasXY(lat,lon,w,h));
      smoothClosedPath(ctx, pts);
      ctx.fillStyle = 'rgba(92,122,208,0.92)';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(190,208,255,0.55)';
      ctx.stroke();

      // subtle interior terrain variation, clipped to the landmass shape
      ctx.save();
      ctx.clip();
      const rnd = mulberry32(100+idx);
      const xs = pts.map(p=>p[0]), ys = pts.map(p=>p[1]);
      const bx0=Math.min(...xs), bx1=Math.max(...xs), by0=Math.min(...ys), by1=Math.max(...ys);
      for(let i=0;i<4;i++){
        const x = bx0 + rnd()*(bx1-bx0);
        const y = by0 + rnd()*(by1-by0);
        const rad = 16+rnd()*34;
        const g = ctx.createRadialGradient(x,y,0,x,y,rad);
        g.addColorStop(0, 'rgba(58,82,162,0.5)');
        g.addColorStop(1, 'rgba(58,82,162,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x,y,rad,0,Math.PI*2); ctx.fill();
      }
      ctx.restore();
    });

    return new THREE.CanvasTexture(c);
  }

  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  const globeMesh = new THREE.Mesh(
    new THREE.SphereGeometry(R, 64, 64),
    new THREE.MeshStandardMaterial({ map: buildGlobeTexture(), roughness:0.85, metalness:0.1 })
  );
  globeGroup.add(globeMesh);

  /* =========================================================
     5. BEACONS (pins)
     ========================================================= */
  function latLonToVec3(lat, lon, radius){
    const latRad = lat*Math.PI/180, lonRad = lon*Math.PI/180;
    return new THREE.Vector3(
      radius*Math.cos(latRad)*Math.sin(lonRad),
      radius*Math.sin(latRad),
      radius*Math.cos(latRad)*Math.cos(lonRad)
    );
  }

  const labelsLayer = document.getElementById('labels-layer');
  const pins = SECTIONS.map(section => {
    const localPos = latLonToVec3(section.lat, section.lon, R*1.015);

    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 16),
      new THREE.MeshBasicMaterial({ color:0xffb454 })
    );
    dot.position.copy(localPos);
    globeGroup.add(dot);

    // pulsing ping sprite (always faces camera)
    const pc = document.createElement('canvas'); pc.width=pc.height=128;
    const pctx = pc.getContext('2d');
    const pg = pctx.createRadialGradient(64,64,0,64,64,64);
    pg.addColorStop(0, 'rgba(255,180,84,0.55)');
    pg.addColorStop(1, 'rgba(255,180,84,0)');
    pctx.fillStyle = pg; pctx.fillRect(0,0,128,128);
    const pingTex = new THREE.CanvasTexture(pc);
    const ping = new THREE.Sprite(new THREE.SpriteMaterial({
      map:pingTex, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending
    }));
    ping.position.copy(localPos);
    ping.scale.set(0.3,0.3,1);
    globeGroup.add(ping);

    // HTML label
    const btn = document.createElement('button');
    btn.className = 'pin-label';
    btn.setAttribute('aria-label', 'Open ' + section.title);
    btn.innerHTML = '<span class="pip"></span><span class="txt"><span class="title">'+section.title+'</span><span class="sub">'+section.sub+'</span></span>';
    btn.addEventListener('click', () => enterSection(section.id));
    labelsLayer.appendChild(btn);

    return { section, localPos, ping, labelEl: btn, phase: Math.random()*Math.PI*2 };
  });

  /* =========================================================
     6. CAMERA STATE + INTERACTION
     ========================================================= */
  let camPolar = Math.PI/2;      // vertical orbit angle
  let lastInteraction = performance.now();
  let dragging = false;
  let state = 'idle';            // idle | animating | zoomed
  let lastX=0, lastY=0;
  const activePointers = new Map();
  let pinchStartDist = null, pinchStartCamDist = orbitDist;


  function placeCamera(){
    camera.position.x = 0;
    camera.position.y = camDist*Math.cos(camPolar);
    camera.position.z = camDist*Math.sin(camPolar);
    camera.lookAt(0,0,0);
  }

  function onPointerDown(e){
    if(state==='zoomed') return;
    dragging = true;
    container.classList.add('dragging');
    lastX = e.clientX; lastY = e.clientY;
    activePointers.set(e.pointerId, {x:e.clientX, y:e.clientY});
    container.setPointerCapture(e.pointerId);
    lastInteraction = performance.now();
    hint.classList.add('faded');
  }
  function onPointerMove(e){
    if(!activePointers.has(e.pointerId)) return;
    activePointers.set(e.pointerId, {x:e.clientX, y:e.clientY});
    lastInteraction = performance.now();

    if(activePointers.size === 2){
      const pts = Array.from(activePointers.values());
      const d = Math.hypot(pts[0].x-pts[1].x, pts[0].y-pts[1].y);
      if(pinchStartDist===null){ pinchStartDist = d; pinchStartCamDist = camDist; }
      else if(state!=='zoomed'){
        const scale = pinchStartDist / d;
        camDist = clamp(pinchStartCamDist*scale, MIN_DIST, MAX_DIST);
      }
      return;
    }
    if(!dragging || state==='zoomed') return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    globeGroup.rotation.y += dx*DRAG_SENS;
    camPolar = clamp(camPolar - dy*DRAG_SENS*0.6, TILT_MIN, TILT_MAX);
  }
  function onPointerUp(e){
    activePointers.delete(e.pointerId);
    pinchStartDist = null;
    if(activePointers.size===0){ dragging=false; container.classList.remove('dragging'); }
    lastInteraction = performance.now();
  }
  function onWheel(e){
    if(state==='zoomed') return;
    e.preventDefault();
    camDist = clamp(camDist + e.deltaY*0.004, MIN_DIST, MAX_DIST);
    lastInteraction = performance.now();
    hint.classList.add('faded');
  }

  container.addEventListener('pointerdown', onPointerDown);
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerup', onPointerUp);
  container.addEventListener('pointercancel', onPointerUp);
  container.addEventListener('wheel', onWheel, { passive:false });

  window.addEventListener('resize', () => {
    camera.aspect = vw()/vh();
    camera.updateProjectionMatrix();
    renderer.setSize(vw(), vh());

    const newOrbit = computeOrbitDist();
    const newMin = newOrbit*0.72, newMax = newOrbit*1.44;
    if(state==='idle'){ camDist = clamp(camDist, newMin, newMax); }
    orbitDist = newOrbit; MIN_DIST = newMin; MAX_DIST = newMax;
  });

  /* =========================================================
     7. TWEENING
     ========================================================= */
  function easeInOutCubic(t){ return t<0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2; }
  function tween(duration, onUpdate, onComplete){
    if(reducedMotion){ onUpdate(1); if(onComplete) onComplete(); return; }
    const start = performance.now();
    function step(now){
      const t = Math.min(1, (now-start)/duration);
      onUpdate(easeInOutCubic(t));
      if(t<1) requestAnimationFrame(step); else if(onComplete) onComplete();
    }
    requestAnimationFrame(step);
  }
  function shortestDelta(from,to){
    const twoPi = Math.PI*2;
    let d = (to-from) % twoPi;
    if(d>Math.PI) d-=twoPi; else if(d<-Math.PI) d+=twoPi;
    return d;
  }
  function faceCameraAngle(localPos){
    return Math.atan2(-localPos.x, localPos.z);
  }

  /* =========================================================
     8. SECTION ENTER / EXIT
     ========================================================= */
  const panelEl = document.getElementById('panel');
  const panelContent = document.getElementById('panel-content');
  const backBtn = document.getElementById('back-btn');
  const hint = document.getElementById('hint');
  const welcomeEl = document.getElementById('welcome');
  let lastTriggerEl = null;

  function enterSection(id){
    if(state!=='idle') return;
    const pin = pins.find(p=>p.section.id===id);
    if(!pin) return;
    lastTriggerEl = pin.labelEl;
    state = 'animating';
    hint.classList.add('faded');
    welcomeEl.classList.add('faded');

    const fromY = globeGroup.rotation.y;
    const delta = shortestDelta(fromY, faceCameraAngle(pin.localPos));
    const fromDist = camDist;
    const fromPolar = camPolar;
    const toPolar = clamp(Math.PI/2 - (pin.section.lat*Math.PI/180)*0.5, TILT_MIN, TILT_MAX);

    tween(1000, (t)=>{
      globeGroup.rotation.y = fromY + delta*t;
      camDist = fromDist + (ZOOM_DIST-fromDist)*t;
      camPolar = fromPolar + (toPolar-fromPolar)*t;
    }, ()=>{
      state='zoomed';
      openPanel(id);
    });
  }

  function openPanel(id){
    const data = SECTION_CONTENT[id];
    panelContent.innerHTML = '<div class="eyebrow">'+data.eyebrow+'</div>' + data.html;
    panelEl.classList.add('open');
    panelEl.setAttribute('aria-hidden','false');
    backBtn.focus();
  }

  function exitSection(){
    panelEl.classList.remove('open');
    panelEl.setAttribute('aria-hidden','true');
    state = 'animating';
    const fromDist = camDist, fromPolar = camPolar;
    setTimeout(()=>{
      tween(700, (t)=>{
        camDist = fromDist + (orbitDist-fromDist)*t;
        camPolar = fromPolar + (Math.PI/2-fromPolar)*t;
      }, ()=>{
        state='idle';
        lastInteraction = performance.now();
        welcomeEl.classList.remove('faded');
        if(lastTriggerEl) lastTriggerEl.focus();
      });
    }, 250);
  }
  backBtn.addEventListener('click', exitSection);
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && state==='zoomed') exitSection(); });


  (function typeWelcome(){
    const line = document.getElementById('welcome-line');
    if(reducedMotion){ line.textContent = WELCOME_FINAL; return; }

    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    function type(str, onDone){
      let i = 0;
      (function step(){
        line.textContent = str.slice(0, i);
        line.appendChild(cursor);
        if(i < str.length){ i++; setTimeout(step, 34); }
        else { setTimeout(onDone, 1500); }
      })();
    }
    function erase(str, onDone){
      let i = str.length;
      (function step(){
        line.textContent = str.slice(0, i);
        line.appendChild(cursor);
        if(i > 0){ i--; setTimeout(step, 20); }
        else { setTimeout(onDone, 250); }
      })();
    }
    function settle(){
      cursor.remove();
      line.style.transition = 'opacity 0.4s ease';
      line.style.opacity = '0';
      setTimeout(() => {
        line.textContent = WELCOME_FINAL;
        line.style.opacity = '1';
      }, 420);
    }

    setTimeout(() => {
      type(WELCOME_LINE_1, () => {
        erase(WELCOME_LINE_1, () => {
          type(WELCOME_LINE_2, settle);
        });
      });
    }, 650);
  })();


  const hudStatus = document.getElementById('hud-status');

  function updateLabels(){
    pins.forEach(pin=>{
      const world = pin.localPos.clone();
      globeGroup.localToWorld(world);
      const dir = world.clone().normalize();
      const camDir = camera.position.clone().normalize();
      const facing = dir.dot(camDir);

      if(state==='zoomed' || facing < 0.12){
        pin.labelEl.style.display = 'none';
        return;
      }
      pin.labelEl.style.display = 'flex';
      const proj = world.clone().project(camera);
      pin.labelEl.style.left = ((proj.x*0.5+0.5)*vw()) + 'px';
      pin.labelEl.style.top = ((-proj.y*0.5+0.5)*vh()) + 'px';
      pin.labelEl.style.opacity = Math.min(1, (facing-0.12)/0.35).toFixed(2);
    });
  }

  function animate(now){
    requestAnimationFrame(animate);

    if(state==='idle' && !dragging && !reducedMotion && (now-lastInteraction) > IDLE_DELAY){
      globeGroup.rotation.y += IDLE_ROTATE_SPEED*(1/60);
    }

    pins.forEach(pin=>{
      const s = 0.3 + (Math.sin(now*0.0022 + pin.phase)*0.5+0.5)*0.55;
      pin.ping.scale.set(s,s,1);
      pin.ping.material.opacity = 0.9 - (s-0.3)/0.55*0.9;
    });

    placeCamera();
    renderer.render(scene, camera);
    updateLabels();

    const heading = Math.round(((globeGroup.rotation.y % (Math.PI*2)) + Math.PI*2) % (Math.PI*2) * 180/Math.PI);
    hudStatus.innerHTML = '<span class="dot"></span>HDG ' + String(heading).padStart(3,'0') + '°';
  }
  placeCamera();
  requestAnimationFrame(animate);

})();
