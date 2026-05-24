````markdown
# Node.js Service Deployment with Terraform + Ansible

A complete DevOps project that provisions infrastructure on AWS using Terraform and deploys a Node.js application using Ansible automation.

This project demonstrates Infrastructure as Code (IaC), configuration management, remote deployment, and service automation in a production-style workflow.

Project inspired by:  
https://roadmap.sh/projects/nodejs-service-deployment

---

# Features

- Provision AWS EC2 infrastructure using Terraform
- Configure servers automatically with Ansible
- Deploy a Node.js Express application
- Automated Node.js installation and setup
- PM2 process management
- Remote deployment using SSH
- Structured DevOps repository layout
- Clean separation of infrastructure, automation, and application code

---

# Tech Stack

- Node.js
- Express.js
- Terraform
- Ansible
- AWS EC2
- PM2
- Ubuntu Linux

---

# Project Structure

```bash
nodejsServiceCICD/
├── ansible/
│   ├── inventory.ini
│   ├── node_service.yml
│   └── roles/
│       ├── app/
│       └── base/
│
├── app/
│   ├── data/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── terraform/
│   ├── main.tf
│   └── .terraform.lock.hcl
│
├── .gitignore
└── README.md
````

---

# Infrastructure Provisioning

Terraform is used to:

* Create AWS EC2 instances
* Configure security groups
* Manage SSH key pairs
* Provision cloud infrastructure reproducibly

### Run Terraform

```bash
cd terraform

terraform init
terraform plan
terraform apply
```

---

# Configuration Management

Ansible is used to:

* Install Node.js
* Install PM2
* Copy application files
* Install dependencies
* Start and manage the Node.js service

### Run Ansible Playbook

```bash
cd ansible

ansible-playbook -i inventory.ini node_service.yml
```

---

# Application

The application is a simple Express.js API service running on:

```bash
http://<server-ip>:3001
```

---

# Deployment Workflow

1. Provision AWS infrastructure using Terraform
2. Get EC2 public IP
3. Update Ansible inventory
4. Run Ansible playbook
5. Application gets deployed automatically
6. PM2 keeps the service running

---

# Learning Outcomes

Through this project I practiced:

* Infrastructure as Code
* Server provisioning
* Linux server automation
* Ansible roles and playbooks
* Terraform resource management
* CI/CD style deployment practices
* Remote server management
* Node.js production deployment

---

# Future Improvements

* Add GitHub Actions CI/CD pipeline
* Dockerize the application
* Add Nginx reverse proxy
* Add HTTPS with Let's Encrypt
* Multi-environment deployments
* Monitoring and logging

---

# Author

Shravani Urankar

```
```
