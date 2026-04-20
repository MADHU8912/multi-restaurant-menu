pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nikhilabba12/multi-restaurant-menu'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Show Files') {
            steps {
                bat 'dir'
                bat 'dir backend'
            }
        }

        stage('Docker Check') {
            steps {
                bat 'docker version'
                bat 'docker ps'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Docker Push') {
            steps {
                bat 'docker push %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Docker Pull') {
            steps {
                bat 'docker pull %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Trigger Render Deploy') {
            steps {
                echo 'Add your Render deploy hook here'
            }
        }

        stage('Build Report') {
            steps {
                bat '''
                echo Build successful > build-report.txt
                echo Image: %IMAGE_NAME%:%IMAGE_TAG% >> build-report.txt
                '''
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
        failure {
            bat 'echo Pipeline failed > build-report.txt'
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
    }
}