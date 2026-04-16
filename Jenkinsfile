pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'YOUR_GITHUB_REPO_URL'
            }
        }

        stage('Build') {
            steps {
                bat 'echo Build stage successful'
            }
        }

        stage('Report') {
            steps {
                bat 'echo Build report created > build-report.txt'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t multi-restaurant-menu .'
            }
        }
    }
}