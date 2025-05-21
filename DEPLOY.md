# Client-Side Installation and Deployment Guide

## Steps to Deploy

1. **Pull the Updated Code**
   - Ensure your local repository is up-to-date with the latest changes:
     ```bash
     git pull origin main
     ```

2. **Update Environment Variables**
   - Edit the `.env` file with the following configurations:
     - **Set the backend service URL:**
       ```env
       NEXT_PUBLIC_BASE_URL="your-backend-service-url"
       ```
     - **Set the port (if required):**
       ```env
       NEXT_PUBLIC_PORT="port-based-on-your-requirement"
       ```
     - **Set the hostname of the backend service:**
       ```env
       ADDITIONAL_HOSTNAME="hostname-of-backend-service"
       ```
     - **Set the protocol of the backend service:**
       ```env
       ADDITIONAL_PROTOCOL="protocol-of-backend-service"
       ```
     - **Set the port of the backend service (optional):**
       ```env
       ADDITIONAL_PORT="port-of-backend-service" # Leave empty if not applicable
       ```

3. **Build the Project**
   - Prepare the project for production by creating a build:
     ```bash
     npm run build
     ```

4. **Start the Application**
   - Run the project in production mode:
     ```bash
     npm start
     ```
