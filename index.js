let allEngines = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchEngines();

  // Search event
  document.querySelector('#search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allEngines.filter(engine =>
      engine.name.toLowerCase().includes(searchTerm) ||
      engine.description.toLowerCase().includes(searchTerm)
    );
    renderEngineList(filtered);
  });

  // Filter buttons event
  document.querySelectorAll('#filters button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.target.dataset.type;
      if (type === 'All') {
        renderEngineList(allEngines);
      } else {
        const filtered = allEngines.filter(engine => engine.type === type);
        renderEngineList(filtered);
      }
    });
  });
});

function fetchEngines() {
  fetch('http://localhost:3000/engines')
    .then(response => response.json())
    .then(engines => {
      allEngines = engines;
      renderEngineList(engines);
    })
    .catch(error => {
      console.error('Error fetching engines:', error);
      const engineList = document.querySelector('#engine-listings ul');
      engineList.innerHTML = '<li>Failed to load engines.</li>';
    });
}

function renderEngineList(engines) {
  const engineList = document.querySelector('#engine-listings ul');
  engineList.innerHTML = '';
  engines.forEach(engine => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="engine-card">
        <h3>${engine.name}</h3>
        <p>${engine.description}</p>
        <button>Buy Now</button>
      </div>
    `;
    // Add mouseover event for interactivity
    li.querySelector('.engine-card').addEventListener('mouseover', () => {
      li.querySelector('.engine-card').style.backgroundColor = '#e0e0e0';
    });
    li.querySelector('.engine-card').addEventListener('mouseout', () => {
      li.querySelector('.engine-card').style.backgroundColor = '';
    });
    engineList.appendChild(li);
  });
}