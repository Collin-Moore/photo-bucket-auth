// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDIwxKDJXE9z1VxyyvVT-YpLQw-7DAUtGo",
    authDomain: "moorect-photo-bucket-auth.firebaseapp.com",
    databaseURL: "https://moorect-photo-bucket-auth.firebaseio.com",
    projectId: "moorect-photo-bucket-auth",
    storageBucket: "moorect-photo-bucket-auth.appspot.com",
    messagingSenderId: "83881608311"
  },
  rosefireRegistryToken: "c9fd883d-3749-4501-8f11-4bee8f930b0d"
};
