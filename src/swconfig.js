export default {
  onUpdate: registration => {
    registration.unregister().then(() => {
      window.location.reload();
    });
  },
  onSuccess: registration => {
    console.info("service worker on success state");
    console.log(registration);
  }
};
