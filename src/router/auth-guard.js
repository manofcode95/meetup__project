import store from '@/store';

export default function(to, from, next) {
  let user = localStorage.getItem('user');
  if (user) {
    next();
  } else {
    next({ name: 'signup' });
  }
}
