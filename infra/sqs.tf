resource "aws_sqs_queue" "requests" {
  provider                   = aws.us_east_1
  name                       = "requests"
  max_message_size           = 256 * 1024
  visibility_timeout_seconds = 360
}
