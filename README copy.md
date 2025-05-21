# beemabox-website



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.celloscope.net/beemabox/beemabox-website.git
git branch -M main
git push -uf origin main
```

# Development
Run the development server:
```
# Using npm
npm run dev

# Or using Yarn
yarn dev
```

Open your browser and visit http://localhost:3000 to view the app.


# Building for Production
Build the application for production:
```
# Using npm
npm run build

# Or using Yarn
yarn build
```
This will create an optimized production build in the .next/ directory.

Start the production server:
```
# Using npm
npm run start
```
# Or using Yarn
yarn start
By default, the production server runs on http://localhost:3000.