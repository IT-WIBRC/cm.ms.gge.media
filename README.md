# cm.ms.gge.media

## Description
Welcome to our project! This project is to build a media management api that use all the known already exist services (cloudinary, S3). And can be configure to work also on the owner server. This is mainly made to save, update, delete et retrieve media as well as its description. Maybe make the transformation like `cloudinary` does later.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation

 You can just clone teh project or fork it. One done it's all. 

## Usage

- To clone
 
  - with ssh
    ```
      git clone git@github.com:IT-WIBRC/cm.ms.gge.media.git
    ```
  - with https
    ```
      git clone https://github.com/IT-WIBRC/cm.ms.gge.media.git
    ```

### Prerequisite
You will need to have `posgresql` database or image lauched
- [posgresql app](https://www.postgresql.org/download/)
- [posgresql image](https://hub.docker.com/_/postgres/)

NB: To use the image, you will need to have docker installed on your computer

You can also use any other database you want instead of posgresql.

### Lauch app

Once in the project repertory,

- To install dependencies
 ```
   npm ci
 ```

 You will need to create a `.env` file with this variable:

- DB_USER : database user
- DB_PASS : database password
- DB_HOST : database host
- DB_DEV_DB_NAME : database name for development
- DB_DEV_DB_PORT : database port for development
- NUMBER_OF_FILES_UPLOADABLE: default(1)
- MAX_FILE_SIZE: default (1MB)
- MAX_FILE_NAME_SIZE : default (50)
- CLOUDINARY_CLOUD_NAME: Get from cloudinary
- CLOUDINARY_API_KEY: Get from cloudinary
- CLOUDINARY_API_SECRET: Get from cloudinary

NB: For the any environment, you can update (DB_(Env)_DB_NAME, DB_(Env)_DB_PORT)

- To start
 ```
   npm run dev
 ```

## Contributing

We welcome any and all contributions! Here are some ways you can get started:

- Report bugs: If you encounter any bugs, please let us know. Open up an issue and let us know the problem.
- Contribute code: If you are a developer and want to contribute, follow the instructions below to get started!
- Suggestions: If you don't want to code but have some awesome ideas, open up an issue explaining some updates or imporvements you would like to see!
- Documentation: If you see the need for some additional documentation, feel free to add some!

## Credits

- [cloudinary](https://cloudinary.com/)
- [Amazon S3](https://aws.amazon.com/s3/)

--------------------------------------------------------

# TODO
 - Add logs (when the file failed to be save 'on the use case file')
 - Use the builder pattern to manage all the possibles services (MediaServiceBuilder)