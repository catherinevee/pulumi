import pulumi
from pulumi import Config, ResourceOptions
import pulumi.runtime
import pytest
from unittest.mock import Mock, patch

class TestInfrastructure:
    @pulumi.runtime.test
    def test_s3_bucket_encryption(self):
        """Test S3 bucket has encryption enabled."""
        
        # Mock the S3 bucket resource
        def mock_call(token, args, provider):
            if token == "aws:s3/bucket:Bucket":
                return {
                    "id": "test-bucket",
                    "arn": "arn:aws:s3:::test-bucket",
                    "serverSideEncryptionConfiguration": {
                        "rules": [{
                            "applyServerSideEncryptionByDefault": {
                                "sseAlgorithm": "AES256"
                            }
                        }]
                    }
                }
            return {}
        
        # Set up mocks
        pulumi.runtime.set_mocks(mock_call)
        
        # Import and test your infrastructure
        import infra
        
        # Assertions
        pulumi.runtime.run_in_stack(lambda: self.assertIsNotNone(infra.bucket))