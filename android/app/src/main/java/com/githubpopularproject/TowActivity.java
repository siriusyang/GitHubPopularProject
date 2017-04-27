package com.githubpopularproject;

import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

import sirius.nativelibrary.route.AndroidRoute;

/**
 * Created by sirius on 2017-4-26.
 */

public class TowActivity extends AppCompatActivity {
    TextView tvPar;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tow);
        tvPar = (TextView) findViewById(R.id.tvPar);
        Uri uri = getIntent().getData();
        String message = AndroidRoute.getParameters(uri);
        message = message == null ? "" : message;
        tvPar.setText("参数=" + message);
    }
}
