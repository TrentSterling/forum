export const site = {
  slug:'forum', name:'Tront Forum', description:'Long-running devlogs, build notes, and playtest threads.',
  singular:'Topic', plural:'All topics', newLabel:'New topic on GitHub', theme:'light',
  indexContent({topics, esc, time, author, topicPath, counts}) {
    const sorted = topics.toSorted((a,b) => b.updatedAt.localeCompare(a.updatedAt));
    const categories = [...new Set(sorted.map(item => item.category.name))].sort();
    const boards = categories.map(name => `<option>${esc(name)}</option>`).join('');
    const rows = sorted.map(item => `<article class="topic row" data-category="${esc(item.category.name)}">
      <div class="rowmain"><span class="meta">${esc(item.category.name)}</span><h3><a href="${topicPath(item)}">${esc(item.title)}</a></h3>
      <span class="by">Started by ${author(item)}</span></div><span class="count">${counts(item)}</span><span class="stamp">${time(item.updatedAt)}</span></article>`).join('');
    return `<section><div class="toolbar"><h2>Topics</h2><label hidden data-js>Board <select id="board"><option value="">All boards</option>${boards}</select></label></div>
      <div id="entries">${rows || '<p class="empty">Open the first topic.</p>'}</div></section>`;
  }
};
