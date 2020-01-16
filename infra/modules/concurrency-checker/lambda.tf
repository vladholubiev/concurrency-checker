resource "aws_lambda_function" "process" {
  provider         = aws.primary
  function_name    = "process"
  filename         = "${path.module}/../../../artifact.zip"
  source_code_hash = filebase64sha256("${path.module}/../../../artifact.zip")
  role             = aws_iam_role.main.arn
  runtime          = "nodejs14.x"
  handler          = "lib/process/handler.handler"
  memory_size      = 1024
  timeout          = 60
  publish          = false
}

resource "aws_lambda_event_source_mapping" "process" {
  provider         = aws.primary
  event_source_arn = aws_sqs_queue.requests.arn
  function_name    = aws_lambda_function.process.arn
  batch_size       = 1
}
