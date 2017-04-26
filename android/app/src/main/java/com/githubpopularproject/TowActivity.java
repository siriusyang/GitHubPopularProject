package com.githubpopularproject;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

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
        String par = getIntent().getStringExtra("message");
        par = par == null ? "" : par;
        tvPar.setText("参数=" + par);
    }
}
