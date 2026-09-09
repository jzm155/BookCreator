/*
 * Alfarrábio — armazenamento persistente (localStorage)
 * Compartilhado entre index.html (lista de projetos) e projeto.html (ambiente do projeto).
 * Mantém os dados salvos no navegador entre visitas, sem precisar de servidor.
 */

const ALFA_KEYS = {
  PROJECTS: 'alfarrabio:projects',
  PROJECT_DATA: (id) => `alfarrabio:project:${id}`,
};

function alfaLoadProjects(){
  try {
    const raw = localStorage.getItem(ALFA_KEYS.PROJECTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Alfarrábio: falha ao ler projetos salvos', e);
    return [];
  }
}

function alfaSaveProjects(list){
  try {
    localStorage.setItem(ALFA_KEYS.PROJECTS, JSON.stringify(list));
    return true;
  } catch (e) {
    console.error('Alfarrábio: falha ao salvar projetos (armazenamento cheio ou bloqueado)', e);
    return false;
  }
}

function alfaLoadProjectData(id){
  if (!id) return null;
  try {
    const raw = localStorage.getItem(ALFA_KEYS.PROJECT_DATA(id));
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Alfarrábio: falha ao ler conteúdo do projeto', e);
    return null;
  }
}

function alfaSaveProjectData(id, data){
  if (!id) return false;
  try {
    localStorage.setItem(ALFA_KEYS.PROJECT_DATA(id), JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Alfarrábio: falha ao salvar conteúdo do projeto (armazenamento cheio ou bloqueado)', e);
    return false;
  }
}

function alfaDeleteProjectData(id){
  if (!id) return;
  try { localStorage.removeItem(ALFA_KEYS.PROJECT_DATA(id)); } catch (e) {}
}

// Atualiza a data de "última alteração" do projeto na lista, sempre que o
// conteúdo dele (livro, personagens...) é salvo a partir de projeto.html.
function alfaTouchProject(id){
  if (!id) return;
  const list = alfaLoadProjects();
  const p = list.find(x => x.id === id);
  if (p){
    p.updatedAt = new Date().toISOString();
    alfaSaveProjects(list);
  }
}

// Pequeno debounce genérico, usado para não salvar a cada tecla digitada.
function alfaDebounce(fn, wait){
  let t = null;
  return function(...args){
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
