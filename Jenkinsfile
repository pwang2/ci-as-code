properties([[
  $class: 'BuildDiscarderProperty',
  strategy: ['$class': 'LogRotator', numToKeepStr: '20']
]])

def IS_RELEASE = env.BRANCH_NAME == 'master'
def BUILD_CI_BASE = 'pwang2/node-chrome-headless'
def SONAR_SCANNER = 'pwang2/sonarqube-scanner'
def TAG = 'localhost:5000/ruleit'
def SONAR_HOST = 'http://localhost:9000'
def SONAR_TOKEN = ''
def VER = 'latest'

node {
  stage('scm') {
    deleteDir()
    checkout scm
  }

  def COMMIT_SHA =sh(returnStdout: true, script: 'git rev-parse HEAD').trim().take(6)

  docker.image(BUILD_CI_BASE).inside('--cap-add ALL -v /usr/local/share/.cache/yarn/v1:/usr/local/share/.cache/yarn/v1 -v /root/npm-package-offline-cache:/root/npm-package-offline-cache') {
      stage('prep '){ sh 'yarn install' }
      stage('lint '){ sh 'npm run lint' }
      stage('unit '){ sh 'npm run unit' }
      stage('e2e  '){ sh 'npm run e2e' }
      stage('build'){ sh 'npm run build' }
  }

  stage('build image'){
    sh "docker build -t ${TAG}:${VER} ."
    sh "docker push ${TAG}:${VER}"
  }

  withEnv(["COMMIT_SHA=${COMMIT_SHA}", "SONAR_HOST=${SONAR_HOST}", "SONAR_TOKEN=${SONAR_TOKEN}"]) {
    docker.image(SONAR_SCANNER).inside('--network host') {
      stage('sonar'){
        sh """
               sonar-scanner -Dsonar.projectVersion=1.0.0-build.${COMMIT_SHA} \
               -Dsonar.login=${SONAR_TOKEN} \
               -Dsonar.host.url=${SONAR_HOST}
           """
      }
    }
  }

  stage('post-build') {
    publishHTML([
        allowMissing: false,
        keepAll: true,
        reportDir: 'reports/unit/coverage/lcov-report',
        reportFiles: 'index.html',
        reportName: 'Coverage Report',
    ])

    publishHTML([
        allowMissing: false,
        keepAll: true,
        reportDir: 'reports/e2e',
        reportFiles: 'index.html',
        reportName: 'E2E Test Report',
    ])
    junit keepLongStdio: true, testResults: 'reports/unit/junit/*.xml'
  }
}
