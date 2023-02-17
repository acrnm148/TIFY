package com.tify.back.upload;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Services {

    private AmazonS3 s3client;

    @Value("${aws.access_key}")
    private String accessKey;

    @Value("${aws.secret_key}")
    private String secretKey;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @PostConstruct
    private void initializeAmazon() {
        s3client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
                .withRegion(Regions.AP_NORTHEAST_2)
                .build();
    }


    public String uploadFile(String fileName, InputStream inputStream) {
        UUID uuid = UUID.randomUUID();
        String[] splitString = fileName.split("\\.");
        String ext = splitString[splitString.length -1];
        String changedFileName = uuid.toString() +"."+ext;
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("image/" + ext);
        s3client.putObject(new PutObjectRequest(bucketName, changedFileName, inputStream, objectMetadata));
        return s3client.getUrl(bucketName, changedFileName).toString();
    }
}