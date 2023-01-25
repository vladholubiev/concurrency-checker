resource "aws_lambda_function" "process" {
  provider         = aws.primary
  function_name    = "process"
  filename         = "${path.module}/../../../artifact.zip"
  source_code_hash = filebase64sha256("${path.module}/../../../artifact.zip")
  role             = aws_iam_role.main.arn
  runtime          = "nodejs18.x"
  handler          = "lib/process/handler.handler"
  memory_size      = 128
  timeout          = 10
  publish          = false
}

resource "aws_lambda_event_source_mapping" "process" {
  provider               = aws.primary
  event_source_arn       = aws_sqs_queue.requests.arn
  function_name          = aws_lambda_function.process.arn
  batch_size             = 1
  maximum_retry_attempts = 0
}
