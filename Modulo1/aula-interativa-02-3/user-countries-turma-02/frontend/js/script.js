let globalUsers = [];
let globalCountries = [];
let globalUserCountries = [];
let globalFilteredUserCountries = [];

async function start() {
  //Início
  //await fetchUsers();
  //await fetchCountries();

  //Meio
  //console.time('medição');
  //await promiseUsers();
  //await promiseCountries();
  //console.timeEnd('medição');

  //Grand-finale (corrigido em 24/07)
  console.time('PromiseAll');
  await Promise.all([promiseUsers(), promiseCountries()]);
  console.timeEnd('PromiseAll');

  hideSpinner();
  mergeUsersAndCountries();
  render();

  enableFilter();
}

function promiseUsers() {
  return new Promise(async (resolve, reject) => {
    await fetchUsers();

    setTimeout(() => {
      console.log('promiseUsers resolvida');
      resolve();
    }, 1000);
  });
}

function promiseCountries() {
  return new Promise(async (resolve, reject) => {
    await fetchCountries();

    setTimeout(() => {
      console.log('promiseCountries resolvida');
      resolve();
    }, 2000);
  });
}

async function fetchUsers() {
  const response = await fetch('http://localhost:3002/users');
  const json = await response.json();

  globalUsers = json.map(({ name, picture, login, nat }) => {
    return {
      userId: login.uuid,
      userCountry: nat,
      userName: name.first,
      userPicture: picture.large,
    };
  });
}

async function fetchCountries() {
  const response = await fetch('http://localhost:3001/countries');
  const json = await response.json();

  globalCountries = json.map(({ name, flag, alpha2Code }) => {
    return {
      countryId: alpha2Code,
      countryName: name,
      countryFlag: flag,
    };
  });
}

function hideSpinner() {
  document.querySelector('#spinner').classList.add('hide');
}

function mergeUsersAndCountries() {
  globalUserCountries = [];

  globalUsers.forEach((user) => {
    const country = globalCountries.find(
      (country) => country.countryId === user.userCountry
    );

    // const country = globalCountries.filter(
    //   (country) => country.countryId === user.userCountry
    // )[0];

    const { countryName, countryFlag } = country;

    globalUserCountries.push({
      ...user,
      userNameLowerCase: user.userName.toLowerCase(),
      countryName,
      countryFlag,
    });
  });

  globalUserCountries.sort((a, b) => a.userName.localeCompare(b.userName));

  globalFilteredUserCountries = [...globalUserCountries];
}

function render() {
  const divUsers = document.querySelector('#divUsers');

  divUsers.innerHTML = `
    <div class='row'>
      ${globalFilteredUserCountries
        .map(({ countryFlag, userPicture, userName, countryName }) => {
          return `
          <div class='col s6 m4 l3'>
            <div class='flex-row bordered'>
              <img class='avatar' src='${userPicture}' alt='${userName}' />
              <div class='flex-column'>
                <span>${userName}</span>                
                <img class='flag' src='${countryFlag}' alt='${countryName}' />
              </div>
            </div>
          </div>
        `;
        })
        .join('')}      
    </div>  
  `;
}

function enableFilter() {
  const buttonFilter = document.querySelector('#buttonFilter');
  const inputFilter = document.querySelector('#inputFilter');

  buttonFilter.addEventListener('click', handleFilter);
  inputFilter.addEventListener('keyup', handleKeyUp);
}

function handleKeyUp(event) {
  const { key } = event;

  // if (key !== 'Enter') {
  //   return;
  // }

  handleFilter();
}

function handleFilter() {
  const inputFilter = document.querySelector('#inputFilter');
  const filterValue = inputFilter.value.trim().toLowerCase();

  globalFilteredUserCountries = globalUserCountries.filter((item) => {
    return item.userNameLowerCase.includes(filterValue);
  });

  render();
}

start();
