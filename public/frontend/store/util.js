export const signupAjax = (user, success) => {
  $.ajax({
    method: 'POST',
    url: '/signup',
    data: user,
    success: success
  });
};

export const loginAjax = (user, success) => {
  $.ajax({
    method: 'POST',
    url: 'auth/local',
    data: user,
    success
  });
};
