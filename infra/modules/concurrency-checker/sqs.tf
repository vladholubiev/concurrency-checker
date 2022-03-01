resource "aws_sqs_queue" "requests" {
  provider                   = aws.primary
  name                       = "requests"
  max_message_size           = 256 * 1024
  visibility_timeout_seconds = 60
}
