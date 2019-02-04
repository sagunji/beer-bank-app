import iziToast from 'izitoast';

iziToast.settings({
  timeout: 6000,
  resetOnHover: true,
  progressBar: false,
  transitionIn: 'fadeInLeft',
  transitionOut: 'fadeOutRight'
});

export function success({ title, message }) {
  iziToast.success({
    title,
    message
  });
}

export function error({ title, message }) {
  iziToast.error({
    title,
    message
  });
}

export function warning({ title, message }) {
  iziToast.warning({
    title,
    message
  });
}

export function info({ title, message }) {
  iziToast.info({
    title,
    message
  });
}

export function question({ title, message }) {
  iziToast.question({
    title,
    message
  });
}
