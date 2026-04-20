pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nikhilabba12/multi-restaurant-menu'
        IMAGE_TAG  = 'latest'
        RENDER_HOOK = 'YOUR_RENDER_DEPLOY_HOOK_URL'
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
                bat 'dir frontend'
            }
        }

        stage('Docker Check') {
            steps {
                bat 'docker version'
                bat 'docker ps'
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

        stage('Docker Build') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
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
                powershell 'Invoke-WebRequest -Uri "%RENDER_HOOK%" -Method Post'
            }
        }

        stage('Build Report') {
            steps {
                bat '''
                echo Build successful > build-report.txt
                echo Image: %IMAGE_NAME%:%IMAGE_TAG% >> build-report.txt
                echo Deploy triggered to Render >> build-report.txt
                '''
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
        failure {
            bat '''
            echo Pipeline failed > build-report.txt
            echo Check Jenkins stage logs for error >> build-report.txt
            '''
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
    }
}