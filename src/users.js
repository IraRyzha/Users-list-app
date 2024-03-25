function UserService(url, imageUrl) { 
    this.url = url; 
    this.baseImageUrl = new URL(imageUrl);
} 

UserService.prototype.requestAllUsers = async function() {
    try { 
        const users = await fetch(this.url);
        return users.json();
    } catch(error) {
        console.log(error);
        return {};
    }
}

UserService.prototype.requestUserById = async function(id) {
    try {
        const selectedUser = await fetch(`${this.url}/${id}`);
        return selectedUser.json();
    } catch(error) {
        console.log(error);
        return {};
    } 
}

UserService.prototype.showSelectedUser = async function(user) {
    const selectedUserBlock = document.querySelector('.selected-user-block');
    selectedUserBlock.style.display = 'block';
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        selectedUserBlock.style.display = 'none';
    })

    const loader = document.querySelector('.loader');

    loader.style.visibility = 'visible';
    const selectedUser = await this.requestUserById(user.id);
    setTimeout(() => {
        loader.style.visibility = 'hidden';
    }, 500);

    this.baseImageUrl.searchParams.append('r', selectedUser.id);

    const selectedUserItem = document.querySelector('.selected-user-item')
    selectedUserItem.querySelector('#user-photo').src = this.baseImageUrl;
    selectedUserItem.querySelector('#user-name').innerText = selectedUser.name;
    selectedUserItem.querySelector('#user-username').innerText = `Username: ${selectedUser.username}`;

    const moreInfoArea = document.querySelector('.more-info-area')
    moreInfoArea.querySelector('#user-company-name').innerText = selectedUser.company.name;
    moreInfoArea.querySelector('#user-phone').innerText = selectedUser.phone;
    moreInfoArea.querySelector('#user-email').innerText = selectedUser.email;
    moreInfoArea.querySelector('#user-address').innerHTML = `
        ${selectedUser.address.suite},
        ${selectedUser.address.street},
        <br>
        ${selectedUser.address.city} / ${user.address.zipcode}
    `;
};

UserService.prototype.renderAllUsers = function(users) {
    const usersList = document.querySelector('.users-list');

    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.classList.add('user-item');

        this.baseImageUrl.searchParams.append('r', user.id);

        userItem.innerHTML = `
            <figure>
                <img src="${this.baseImageUrl}" alt=""></img>
                <figcaption>
                    <span>${user.name}</span>
                    <span>${user.company.name}</span>
                </figcaption>
            </figure>
        `;
        userItem.addEventListener('click', () => this.showSelectedUser(user));
        usersList.append(userItem);
    });
}