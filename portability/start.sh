DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
JENKINS_HOME="$DIR/.jenkins_home"

mkdir -p "$JENKINS_HOME"
cp -R $DIR/jenkins_preset/ $_

docker-compose -f $DIR/docker-compose.yml up -d

