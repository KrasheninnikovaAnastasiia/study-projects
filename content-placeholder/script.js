const header = document.getElementById('header'),
      title = document.getElementById('title'),
      excerpt = document.getElementById('excerpt'),
      profileImg = document.getElementById('profile_img'),
      profileName = document.getElementById('name'),
      date = document.getElementById('date'),
      animatedBgs = document.querySelectorAll('.animated-bg'),
      animatedBgsText = document.querySelectorAll('.animated-bg-text');

setTimeout(getData, 3000);

function getData() {
    header.innerHTML = '<img src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="img">';

    title.innerHTML = 'Lorem ipsum dolor sit amet';
    excerpt.innerHTML = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas, inventore';
    profileImg.innerHTML = '<img src="https://randomuser.me/api/portraits/men/45.jpg" alt="photo">';
    profileName.innerHTML = 'John Doe';
    date.innerHTML = 'Oct 08, 2021';

    animatedBgs.forEach((bg) => bg.classList.remove('animated-bg'));
    animatedBgsText.forEach((bg) => bg.classList.remove('animated-bg-text'));
}