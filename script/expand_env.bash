export FUNCTION_NAME=$2
printf "cat <<++EOF\n$(cat $1)\n++EOF\n" | sh
