var currentCard = 1;

const cards = document.querySelector('.cards');
const inputValue = document.querySelector('#searchName');
const searchButton = document.querySelector('#search');
const blankCard = document.querySelector('#card').cloneNode(true);
const check = document.querySelector('#check');
const cross = document.querySelector('#cross');

const client_id = 'Iv1.49e1df7aa2f947ad';
const client_secret = '83b8173b7093b0a2df9388c9d3097c8e37c10d74';

const fetchUsers = async user => {
  const api_call = await fetch(
    `https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`
  );

  const data = await api_call.json();
  return { data };
};

const showData = () => {
  const card = document.querySelector('#card');
  const profilePicture = document.querySelector('#profile');
  const nameContainer = document.querySelector('#username');
  const urlContainer = document.querySelector('#url');
  const bioContainer = document.querySelector('#bio');
  const repoContainer = document.querySelector('#repos');

  console.log(cards.getBoundingClientRect);

  fetchUsers(inputValue.value).then(res => {
    console.log(res);
    console.log(blankCard);

    card.classList.add('card');
    card.style.background = `center / cover url('${res.data.avatar_url}')`;
    card.style.opacity = `1`;
    profilePicture.src = `${res.data.avatar_url}`;

    if (res.data.name == null) {
      name.innerHTML = `No name given`;
    } else {
      nameContainer.innerHTML = `${res.data.name}`;
    }

    urlContainer.innerHTML = `${res.data.html_url}`;

    if (res.data.bio != null) {
      bioContainer.innerHTML = `${res.data.bio}`;
    }

    if (res.data.hireable != null) {
      var hireable = check.cloneNode(true);
      hireable.style.color = `#00e676`;
      card.prepend(hireable);
    } else {
      var hireable = cross.cloneNode(true);
      hireable.style.color = `#FF1744`;
      card.prepend(hireable);
    }

    repoContainer.innerHTML = `Repos: ${res.data.public_repos}`;

    cards.prepend(blankCard.cloneNode(true));
  });
};

searchButton.addEventListener('click', () => {
  showData();
});
