(function(){
  const STORAGE_KEY = 'simple_todo.tasks.v1';

  const form = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const linkInput = document.getElementById('linkInput');
  const listEl = document.getElementById('list');
  const counts = document.getElementById('counts');
  const clearBtn = document.getElementById('clearBtn');

  let tasks = load();

  function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
  function load(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }catch(e){ return []; } }

  function render(){
    listEl.innerHTML = '';
    if(!tasks.length){
      listEl.innerHTML = '<div class="empty">No tasks yet — add your first task above.</div>';
      updateCounts();
      return;
    }

    tasks.forEach(t => {
      const item = document.createElement('div');
      item.className = 'task' + (t.done ? ' done' : '');

      const left = document.createElement('div');
      left.className = 'left';

      const chk = document.createElement('button');
      chk.className = 'icon-btn';
      chk.innerText = t.done ? '✅' : '🟦';
      chk.addEventListener('click', ()=>toggleDone(t.id));

      const textWrap = document.createElement('div');
      const text = document.createElement('div');
      text.className = 'text';
      text.textContent = t.title;

      const meta = document.createElement('div');
      meta.className = 'meta';
      if(t.links && t.links.length){
        t.links.forEach((lnk,i)=>{
          const a = document.createElement('a');
          a.href = lnk;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = 'Link ' + (i+1);
          a.style.marginRight = '8px';
          meta.appendChild(a);
        });
      }

      textWrap.appendChild(text);
      if(meta.childNodes.length) textWrap.appendChild(meta);
      left.appendChild(chk);
      left.appendChild(textWrap);

      const actions = document.createElement('div');
      actions.className = 'actions';

      const editBtn = document.createElement('button');
      editBtn.className = 'icon-btn';
      editBtn.innerText = '✏️';
      editBtn.title = 'Edit';
      editBtn.addEventListener('click', ()=>startEdit(t.id));

      const delBtn = document.createElement('button');
      delBtn.className = 'icon-btn';
      delBtn.innerText = '🗑️';
      delBtn.title = 'Delete';
      delBtn.addEventListener('click', ()=>{ if(confirm('Delete this task?')) removeTask(t.id); });

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      item.appendChild(left);
      item.appendChild(actions);
      listEl.appendChild(item);
    });

    updateCounts();
  }

  function updateCounts(){
    const total = tasks.length;
    const done = tasks.filter(t=>t.done).length;
    counts.textContent = `${total} task${total!==1?'s':''} • ${done} done`;
  }

  function addTask(title, links){
    const t = { id: uid(), title: title.trim(), done:false, links: links || [] };
    tasks.unshift(t);
    save();
    render();
  }

  function removeTask(id){
    tasks = tasks.filter(t=>t.id !== id);
    save();
    render();
  }

  function toggleDone(id){
    tasks = tasks.map(t=>t.id===id ? {...t, done:!t.done} : t);
    save();
    render();
  }

  function startEdit(id){
    const t = tasks.find(x=>x.id===id);
    if(!t) return;
    const newTitle = prompt('Edit task title:', t.title);
    if(newTitle===null) return;
    const newLinksRaw = prompt('Edit comma-separated links (leave empty to clear):', (t.links||[]).join(', '));
    if(newTitle.trim()===''){ alert('Title cannot be empty'); return; }
    t.title = newTitle.trim();
    t.links = newLinksRaw ? newLinksRaw.split(',').map(s=>s.trim()).filter(Boolean) : [];
    save();
    render();
  }

  function clearDone(){
    if(!confirm('Remove all completed tasks?')) return;
    tasks = tasks.filter(t=>!t.done);
    save();
    render();
  }

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const title = taskInput.value.trim();
    if(!title) return taskInput.focus();
    const link = linkInput.value.trim();
    const links = link ? [link] : [];
    addTask(title, links);
    taskInput.value = '';
    linkInput.value = '';
    taskInput.focus();
  });

  clearBtn.addEventListener('click', clearDone);
  render();
})();
